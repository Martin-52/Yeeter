import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { UserService } from '../service/user.service';
import { YeetService } from '../service/yeet.service';
import { Yeet } from '../model/yeet';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userLoggedIn: boolean;
  username: string;
  userId: string;
  yeets: Yeet[];

  constructor(public authenticationService: AuthenticationService,
     private userService: UserService,
     private yeetService: YeetService) {}

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

}
