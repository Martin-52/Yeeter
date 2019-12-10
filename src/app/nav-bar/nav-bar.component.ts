import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
  }
  signOut() {
    this.authenticationService.SignOut();
  }

}
