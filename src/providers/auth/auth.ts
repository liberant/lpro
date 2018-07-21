import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { FirestoreProvider } from '../firestore/firestore';
import firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

import { User } from '../../models/user-model';
import { Business } from '../../models/business-model';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AuthProvider {
  private auth: Observable<firebase.User>;
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  business: BehaviorSubject<Business> = new BehaviorSubject<Business>(null);

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, private storage: Storage, ) {
   this.auth = this.afAuth.authState;
   console.log('authstate: ', this.auth);
   this.auth.subscribe((user) => {
      if (user) {
        this.afs.doc<User>(`user/${user.uid}`).valueChanges().first().subscribe(data => {
          this.user$.next(data);
        });
      }
    });
  }

  getUserVal(val): Promise<string> {
    return this.user$.getValue()[val];
  }

  loginUser(email: string, password: string): Promise<firebase.User> {
   return this.afAuth.auth.signInWithEmailAndPassword(email, password);
   /*
    if (auth.user) {
     await this.afs.doc<User>(`user/${auth.user.uid}`).valueChanges().first().subscribe(async data => {
       await this.storage.set('user', data).then(res => { console.log('storage: ', res);})
       await this.user$.next(data);
      });
    }
    return auth;
    */
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    this.storage.clear();
    return this.afAuth.auth.signOut();
  }

}
