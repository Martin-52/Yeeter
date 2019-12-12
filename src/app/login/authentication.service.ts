import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "../login/user";
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userLoggedIn: boolean;
  userData: any;
  userName: string;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router,private userService: UserService) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userLoggedIn = true;
        this.userData = user;
        this.userName = this.userData.displayName;

        localStorage.setItem('uid', JSON.stringify(this.userData.uid));
        localStorage.setItem('username', JSON.stringify(this.userData.displayName));
        // Enter Local Storage/Cookie for authentication token
        // To send to the backend when performing actions.... Maybe

        console.log("Signed in as: ", JSON.parse(localStorage.getItem('username')));

      } else {
        this.userLoggedIn = false;
        localStorage.setItem('user', null);
      }
    })
  }

  /* Sign up */
  SignUp(email: string, password: string, username: string ) {
      
    // Create the user
    this.angularFireAuth
    .auth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed up!', res);
      this.UploadUsername(username, this.angularFireAuth.auth.currentUser.uid).subscribe((res)=> {
        this.SignIn(email, password);
      });
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
    });  
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('uid', JSON.stringify(this.userData.uid));
        localStorage.setItem('username', JSON.stringify(this.userData.displayName));
        this.userLoggedIn = true;
        this.router.navigate(['/home']);
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
      localStorage.clear();
      this.userLoggedIn = false;
  }
  
  UsernameExists(username: string) {
    return this.userService.usernameExists(username).subscribe((res)=>{});
  }

  UploadUsername(username: string, uid: string) {
      return this.userService.uploadUser(username, uid);
  }
}