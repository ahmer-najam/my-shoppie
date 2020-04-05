import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  user: firebase.User;

  constructor() {
    // afAuth.authState.subscribe(user => this.user = user);
   }


  logout(){
    // this.afAuth.auth.signOut();
  }
}
