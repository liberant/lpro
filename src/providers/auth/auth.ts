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


@Injectable()
export class AuthProvider {
userId: string;
busId: string;
busType: string;
user: User;
userRef: AngularFirestoreDocument<User>;
constructor(
    public afAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
    private storage: Storage,
    public afs: FirestoreProvider
  ) {
  }

loginUser(email: string, password: string): Promise<firebase.User> {
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
  console.log(uid);
  return this.afs.doc$<User>(`user/${uid}`).pipe(first()).toPromise();
  }

}
