import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Region } from '../../models/common-model';


@Injectable()
export class SettingsProvider {

  userId: string;
  private regionsListRef = this.fireStore.collection<Region>(`/regions`);
  constructor(
    public fireStore: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getRegionsList(): AngularFirestoreCollection<Region> {
    return this.regionsListRef;
  }
  addRegion(name) {
    return this.regionsListRef.add({name});
  }
  editRegion(region, newRegion) {
    return this.regionsListRef.doc(region.id).update({name: newRegion})
  }
  delRegion(region) {
    return this.regionsListRef.doc(region.id).delete();
  }


  getVarietiesList(): AngularFirestoreCollection<string> {
    return this.fireStore.collection(
      `/varieties`, // This creates the reference
      ref => ref.orderBy('title') // This is the query
    );
  }  
}