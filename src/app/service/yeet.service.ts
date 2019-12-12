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
    this.http.post(this.apiUrl + "/yeet/postYeet", {
      post: post,
      uid: uid,
      username: username
    });
  }

  addLike(yeetKey: string, uid: string) {
    this.http.post(this.apiUrl + "/yeet/addLike", {
      yeetKey: yeetKey,
      uid: uid
    });
  }

  removeLike(yeetKey: string, uid: string) {
    this.http.post(this.apiUrl + "/yeet/removeLike", {
      yeetKey: yeetKey,
      uid: uid
    });
  }

  addDislike(yeetKey: string, uid: string) {
    this.http.post(this.apiUrl + "/yeet/addDislike", {
      yeetKey: yeetKey,
      uid: uid
    });
  }

  removeDislike(yeetKey: string, uid: string) {
    this.http.post(this.apiUrl + "/yeet/removeDislike", {
      yeetKey: yeetKey,
      uid: uid
    });
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
