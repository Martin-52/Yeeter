import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: String = "https://yeeter-web-backend.herokuapp.com";
  constructor(private http: HttpClient) { }

  usernameExists(username: string) {
    return this.http.get<boolean>(this.apiUrl + "/user/usernameExists", {params : {
      username: username
    }});
  }

  uploadUser(username: string, userId: string) {
    let data = "username="+username+"&uid="+userId;
    return this.http.post(this.apiUrl + "/user/uploadUser", data, {headers: {
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    }});
  }

  followUser(username: string, userId: string) {
    let data = "username="+username+"&uid="+userId;
    this.http.post(this.apiUrl + "/user/followUser",data ,{headers: {
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    }});
  }

  unfollowUser(username: string, userId: string) {
    let data = "username="+username+"&uid="+userId;
    this.http.post(this.apiUrl + "/user/unfollowUser",data ,{headers: {
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    }});
  }

  isFollowingUser(username: string, userId: string) {
    return this.http.get<boolean>(this.apiUrl + "/user/isFollowingUser", { params: {
      username: username,
      uid: userId
    }});
  }
}
