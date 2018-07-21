import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreProvider {

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, private storage: Storage) {
  }

  /// **************
  /// Get a Reference
  /// **************

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }


  /// **************
  /// Get Data
  /// **************

// Observables
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => {
      return doc.payload.data() as T;
    }));
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
      return docs.map(a => a.payload.doc.data()) as T[];
    }));
  }

  /// with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn).stateChanges().pipe(map(actions =>
      actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data };
      }))
    );
}
  // Promise
  getDoc<T>(ref: DocPredicate<T>): Promise<T> {
    return this.doc$<T>(`${ref}`).pipe(first()).toPromise();
  }

  getCol<T>(ref: CollectionPredicate<T>): Promise<T[]> {
    return this.col$<T>(`${ref}`).pipe(first()).toPromise();
  }

  /// **************
  /// Write Data
  /// **************


  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getId() {
    return this.afs.createId();
  }


  get(ref, val): Promise<string> {
    return this.afs.doc(ref).ref.get().then(doc => {
      return doc.get(val);
    });
  }

  set<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp;
    return this.doc(ref).set({
      ...data, updatedAt: timestamp, createdAt: timestamp
    });
  }

  update<T>(ref: DocPredicate<T>, data: any) {
    return this.doc(ref).update({
      ...data, updatedAt: this.timestamp
    });
  }

  /// If doc exists update, otherwise set
  upsert<T>(ref: DocPredicate<T>, data: any) {
    console.log(ref, data);
    const doc = this.doc(ref).snapshotChanges().pipe(take(1)).toPromise();
    return doc.then(snap => {
      return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
    });
  }


  delete<T>(ref: DocPredicate<T>) {
    return this.doc(ref).delete();
  }

  add<T>(ref: CollectionPredicate<T>, data) {
    const timestamp = this.timestamp;
    return this.col(ref).add({
      ...data, updatedAt: timestamp, createdAt: timestamp
    });
  }

  geopoint(lat: number, lng: number) {
    return new firebase.firestore.GeoPoint(lat, lng);
  }

  // Clumsy, remove?
  change<T>(ref: DocPredicate<T>, data: any, type: string) {
    console.log(data, type);
    return this.doc(ref).update({
      ...data, [ type ]: this.timestamp
    });
  }


  /// **************
  /// Inspect Data
  /// **************


  inspectDoc(ref: DocPredicate<any>): void {
    const tick = new Date().getTime();
    this.doc(ref).snapshotChanges().pipe(
      take(1),
      tap(d => {
        const tock = new Date().getTime() - tick;
        console.log(`Loaded Document in ${tock}ms`, d);
      }))
      .subscribe();
  }


  inspectCol(ref: CollectionPredicate<any>): void {
    const tick = new Date().getTime();
    this.col(ref).snapshotChanges().pipe(
      take(1),
      tap(c => {
        const tock = new Date().getTime() - tick;
        console.log(`Loaded Collection in ${tock}ms`, c);
      }))
      .subscribe();
  }


  /// **************
  /// Create and read doc references
  /// **************

  /// create a reference between two documents
  connect(host: DocPredicate<any>, key: string, doc: DocPredicate<any>) {
    return this.doc(host).update({ [ key ]: this.doc(doc).ref });
  }


  /// returns a documents references mapped to AngularFirestoreDocument
  docWithRefs$<T>(ref: DocPredicate<T>) {
    return this.doc$(ref).pipe(map(doc => {
      for (const k of Object.keys(doc)) {
        if (doc[ k ] instanceof firebase.firestore.DocumentReference) {
          doc[ k ] = this.doc(doc[ k ].path);
        }
      }
      return doc;
    }));
  }

  /// **************
  /// Atomic batch example
  /// **************


  /// Just an example, you will need to customize this method.
  atomic() {
    const batch = firebase.firestore().batch();
    /// add your operations here

    const itemDoc = firebase.firestore().doc('items/myCoolItem');
    const userDoc = firebase.firestore().doc('users/userId');

    const currentTime = this.timestamp;

    batch.update(itemDoc, { timestamp: currentTime });
    batch.update(userDoc, { timestamp: currentTime });

    /// commit operations
    return batch.commit();
  }

}
