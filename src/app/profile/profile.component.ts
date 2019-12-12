import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { UserService } from '../service/user.service';
import { YeetService } from '../service/yeet.service';
import { Yeet } from '../model/yeet';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  ngOnInit() {
    if ((localStorage.getItem('username') !== null) && (localStorage.getItem('uid') !== null)) {
      this.userLoggedIn = true;
      this.username = JSON.parse(localStorage.getItem('username'));
      this.userId = JSON.parse(localStorage.getItem('uid'));

      this.yeetService.followingPosts(this.userId).subscribe((res)=>{
        this.yeets = res;
        console.log(this.yeets);
      });
    }
    
  }

  signOut() {
    this.authenticationService.SignOut();
    this.router.navigate(['/login']);
  }

}

