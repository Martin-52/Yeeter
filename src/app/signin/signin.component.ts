import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  constructor(public authenticationService: AuthenticationService, private router: Router) {}


  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }
  ngOnInit() {
  }

}
