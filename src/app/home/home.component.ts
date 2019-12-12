import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService, private router: Router) {}
  ngOnInit() {
  }
  signOut() {
    this.authenticationService.SignOut();
    this.router.navigate(['/login']);
  }
}