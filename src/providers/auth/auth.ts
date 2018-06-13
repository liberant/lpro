import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase/app";

@Injectable()
export class AuthProvider {
  constructor(public afAuth: AngularFireAuth, afs: AngularFirestore) {
    console.log("Hello AuthProvider Provider");
  }

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }
  
  logoutUser(): Promise<void> { return this.afAuth.auth.signOut();
  }
   
}
