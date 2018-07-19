import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

import { User } from '../../models/user-model';
import { Business } from '../../models/business-model';
import { Observable } from 'rxjs';
import { first, startWith, switchMap, tap } from 'rxjs/operators';


@Injectable()
export class AuthProvider {
user$: Observable<User>;
user: User;
userRef: AngularFirestoreDocument<User>;
constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private storage: Storage,
  ) {
  }

getUser() {
  this.user$ = this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      }
      return this.user$;
  }));
}

async loginUser(email: string, password: string): Promise<firebase.User> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

async logoutUser(): Promise<void> {
    await this.storage.clear();
    return this.afAuth.auth.signOut();
  }
curUser(uid): Promise<User> {
  return this.afs.doc$<User>(`user/${uid}`).pipe(first()).toPromise();
  }

}
