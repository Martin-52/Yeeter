import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  username: string;

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
  }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password, this.username);
    this.email = ''; 
    this.password = '';
    this.username = '';
  }

}
