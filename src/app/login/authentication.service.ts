import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "../login/user";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userLoggedIn: boolean;
  userData: any;
  userName: string;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
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
      
    if (this.UsernameExists(username)) {
      this.userLoggedIn = false;
      // Throw a username exists error.
      // Or something similar \(><)/
    } else {
      /*
        This is where the magic happens.
        Use something similar to iOS' ProfileChangeRequest.
        The request makes it possible to add different user data.
        But we will primarily use it for displayname/username.
      */

      // Create the user
      this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.userLoggedIn = true;
        this.SignIn(email, password);
        console.log('Successfully signed up!', res);

      /*
        To stay consistent, we'll use the back-end to make changes to the user profile.
        Will be implemented soon...
      */
        this.UploadUsername(username, this.angularFireAuth.auth.currentUser.uid);
      })
      .catch(error => {
        this.userLoggedIn = true;
        console.log('Something is wrong:', error.message);
      });        
    }
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
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
    // Dummy method that makes a backend call to determine whether
    // the user desired username is already taken. 
    return false;
  }

  UploadUsername(username: string, uid: string) {
    /// Dummy method to add the username into the database.
    // Will implement once the API is up and running.
  }

}