import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { UserService } from '../service/user.service';
import { YeetService } from '../service/yeet.service';
import { Yeet } from '../model/yeet';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService, private router: Router, private userService: UserService,
    private yeetService: YeetService) {}
  userLoggedIn: boolean;
  username: string;
  userId: string;
  yeets: Yeet[];
  user: User;
  yeetText: string;
  userToFollow: string;

  ngOnInit() {
    if ((localStorage.getItem('username') !== null) && (localStorage.getItem('uid') !== null)) {
      this.userLoggedIn = true;
      this.username = JSON.parse(localStorage.getItem('username'));
      this.userId = JSON.parse(localStorage.getItem('uid'));

      this.yeetService.personalPosts(this.userId).subscribe((res)=>{
        this.yeets = res;
        console.log(this.yeets);
      });

      this.yeetService.userInfo(this.userId, this.username).subscribe((res)=> {
        this.user = res;
        console.log(this.user);
      });
    }
    
  }

  signOut() {
    this.authenticationService.SignOut();
    this.router.navigate(['/login']);
  }

  like(item: Yeet) {
    if (item.userLiked) {
      this.yeetService.removeLike(item.key, this.userId, item.userId);
    } else {
      this.yeetService.addLike(item.key, this.userId, item.userId);
    }
  }

  dislike(item: Yeet) {
    if (item.userDisliked) {
      this.yeetService.removeDislike(item.key, this.userId, item.userId);
    } else {
      this.yeetService.addDislike(item.key, this.userId, item.userId);
    }
  }

  post() {
    console.log("Did this run");
    this.yeetService.postYeet(this.yeetText, this.userId, this.username);
    this.yeetText = "";
  }

  follow() {
    this.userService.followUser(this.userToFollow, this.userId);
    this.userToFollow = "";
  }
}

