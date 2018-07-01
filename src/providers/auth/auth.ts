import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import firebase from 'firebase/app';
import { User } from '../../models/user-model';
import { Business } from '../../models/business-model';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
  ) { }

  loginUser(email: string, password: string): Promise<firebase.User> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
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
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        busId: busId,
        busType: busType,
        busName: busName,
        photoURL: photoURL,
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
    //const busId: string = await this.inventoryProvider.getbusId();

    const userCollection: AngularFirestoreCollection<
      any
      > = this.fireStore.collection(`busProfile/${busId}/busMemberList`);
    const id: string = this.fireStore.createId();

    const regularUser = {
      id: id,
      email: email,
      busId: busId
    };

    return userCollection.add(regularUser);
  }

}