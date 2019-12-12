import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Yeet } from '../model/yeet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YeetService {
  apiUrl: String = "https://yeeter-web-backend.herokuapp.com";
  constructor(private http: HttpClient) { }

  postYeet(post: string, uid: string, username: string) {
    let data = "post="+post+"&uid="+uid+"&username="+username;
    this.http.post(this.apiUrl + "/yeet/postYeet", data, {headers:{
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    }}).subscribe((res)=>{});
  }

  addLike(yeetKey: string, uid: string, postUserId: string) {
    let data = "yeetKey="+yeetKey+"&uid="+uid+"&postUserId="+postUserId;
    this.http.post<any>(this.apiUrl + "/yeet/addLike", data, {headers:{
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    }}).subscribe((res)=>{});
  }

  removeLike(yeetKey: string, uid: string, postUserId: string) {
    let data = "yeetKey="+yeetKey+"&uid="+uid+"&postUserId="+postUserId;
    this.http.post<any>(this.apiUrl + "/yeet/removeLike",data, { headers:{
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    }})
    .subscribe((res)=>{});
  }

  addDislike(yeetKey: string, uid: string, postUserId: string) {
    let data = "yeetKey="+yeetKey+"&uid="+uid+"&postUserId="+postUserId;
    this.http.post<any>(this.apiUrl + "/yeet/addDislike", data, {  headers:{
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    }}).subscribe((res)=>{});
  }

  removeDislike(yeetKey: string, uid: string, postUserId: string) {
    let data = "yeetKey="+yeetKey+"&uid="+uid+"&postUserId="+postUserId;
    this.http.post<any>(this.apiUrl + "/yeet/removeDislike", data ,{  headers:{
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    }}).subscribe((res)=>{});
  }

  personalPosts(uid: string) {
    return this.http.get<Yeet[]>(this.apiUrl + "/yeet/personalPosts",{params: {
      uid: uid
    }});
  }

  followingPosts(uid: string) {
    return this.http.get<Yeet[]>(this.apiUrl + "/yeet/followingPosts",{params: {
      uid: uid
    }});
  }
}
