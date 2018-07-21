import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Item } from '../../models/common-model';


@Injectable()
export class SettingsProvider {

  userId: string;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  get(path): AngularFirestoreCollection<Item> {
    return this.afs.collection(`${path}`);
  }

  add(path: string, data) {
    this.afs.collection(`${path}`).add(data);
  }

  update(path: string, id, data) {
    this.afs.doc(`${path}/${id}`).update(data);
  }

  delete(path: string, id: string) {
    this.afs.doc(`${path}/${id}`).delete();
  }
}
