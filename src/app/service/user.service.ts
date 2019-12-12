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
    this.http.post(this.apiUrl + "/user/uploadUser", {
      username: username,
      uid: userId
    });
  }

  followUser(username: string, userId: string) {
    this.http.post(this.apiUrl + "/user/followUser", {
      username: username,
      uid: userId
    });
  }

  unfollowUser(username: string, userId: string) {
    this.http.post(this.apiUrl + "/user/unfollowUser", {
      username: username,
      uid: userId
    });
  }

  isFollowingUser(username: string, userId: string) {
    return this.http.get<boolean>(this.apiUrl + "/user/isFollowingUser", { params: {
      username: username,
      uid: userId
    }});
  }
}
