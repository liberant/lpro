import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
  } from 'angularfire2/firestore';
import { User } from '../../models/user-model';

@Injectable()
export class UsersProvider {
  userId: string;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getList(path): AngularFirestoreCollection<User> {
return this.afs.collection(`${path}`);
  }

  get(path): AngularFirestoreDocument<User> {
    return this.afs.doc(`${path}`);
  }

  add(path: string, data) {
    return this.afs.collection(`${path}`).add(data);
  }

  update(path: string, id, data) {
    return this.afs.doc(`${path}/${id}`).update(data);
  }

  delete(path: string, id: string) {
    return this.afs.doc(`${path}/${id}`).delete();
  }

}
