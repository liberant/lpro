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
curUser(uid) {
    return this.afs.doc$<User>(`user/${uid}`).pipe(first()).toPromise();
  }


async setIds(uid) {
    this.user = await this.curUser(uid);
    await this.storage.set('uid', this.user.id);
    await this.storage.set('busId', this.user.busId);
    this.busId = this.user.busId;
    await this.storage.set('type', this.user.busType);
    this.busType = this.user.busType;
    return (this.user);
  }

async createAdminUser(
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    busType: string,
    busName: string,
    photoURL: string
  ): Promise<firebase.User> {
    try {
      const adminUserCredential: firebase.auth.UserCredential = await this.afAuth.auth
        .createUserWithEmailAndPassword(
          email,
          password
        );
      const userProfileDocument: AngularFirestoreDocument<
        User
        > = this.fireStore.doc(`user/${adminUserCredential.user.uid}`);

      const busId: string = this.fireStore.createId();

      await userProfileDocument.set({
        id: adminUserCredential.user.uid,
        firstName,
        lastName,
        email,
        phone,
        busId,
        busType,
        busName,
        photoURL,
        admin: true,
        active: true
      });

      const busProfile: AngularFirestoreDocument<
        Business
        > = this.fireStore.doc(`business/${busId}`);

      await busProfile.set({
        id: busId,
        adminId: adminUserCredential.user.uid,
        type: busType,
        name: busName
      });

      return adminUserCredential.user;
    } catch (error) {
      console.error(error);
    }
  }

async createRegularUser(email: string, busId: string): Promise<any> {

    const userCollection: AngularFirestoreCollection<
      any
      > = this.fireStore.collection(`busProfile/${busId}/busMemberList`);
    const id: string = this.fireStore.createId();

    const regularUser = {
      id,
      email,
      busId
    };

    return userCollection.add(regularUser);
  }

}
