var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';
let FirestoreProvider = class FirestoreProvider {
    constructor(afs, afAuth) {
        this.afs = afs;
        this.afAuth = afAuth;
        afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
        });
    }
    /// **************
    /// Get a Reference
    /// **************
    col(ref, queryFn) {
        return typeof ref === 'string' ? this.afs.collection(ref, queryFn) : ref;
    }
    doc(ref) {
        return typeof ref === 'string' ? this.afs.doc(ref) : ref;
    }
    /// **************
    /// Get Data
    /// **************
    doc$(ref) {
        return this.doc(ref).snapshotChanges().map(doc => {
            return doc.payload.data();
        });
    }
    col$(ref, queryFn) {
        return this.col(ref, queryFn).snapshotChanges().map(docs => {
            return docs.map(a => a.payload.doc.data());
        });
    }
    /// with Ids
    colWithIds$(ref, queryFn) {
        return this.col(ref, queryFn).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return Object.assign({ id }, data);
            });
        });
    }
    /// **************
    /// Write Data
    /// **************
    /// Firebase Server Timestamp
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }
    set(ref, data) {
        const timestamp = this.timestamp;
        return this.doc(ref).set(Object.assign({}, data, { updatedAt: timestamp, createdAt: timestamp }));
    }
    update(ref, data) {
        return this.doc(ref).update(Object.assign({}, data, { updatedAt: this.timestamp }));
    }
    delete(ref) {
        return this.doc(ref).delete();
    }
    add(ref, data) {
        const timestamp = this.timestamp;
        return this.col(ref).add(Object.assign({}, data, { updatedAt: timestamp, createdAt: timestamp }));
    }
    geopoint(lat, lng) {
        return new firebase.firestore.GeoPoint(lat, lng);
    }
    /// If doc exists update, otherwise set
    upsert(ref, data) {
        const doc = this.doc(ref).snapshotChanges().take(1).toPromise();
        return doc.then(snap => {
            return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
        });
    }
    /// **************
    /// Inspect Data
    /// **************
    inspectDoc(ref) {
        const tick = new Date().getTime();
        this.doc(ref).snapshotChanges()
            .take(1)
            .do(d => {
            const tock = new Date().getTime() - tick;
            console.log(`Loaded Document in ${tock}ms`, d);
        })
            .subscribe();
    }
    inspectCol(ref) {
        const tick = new Date().getTime();
        this.col(ref).snapshotChanges()
            .take(1)
            .do(c => {
            const tock = new Date().getTime() - tick;
            console.log(`Loaded Collection in ${tock}ms`, c);
        })
            .subscribe();
    }
    /// **************
    /// Create and read doc references
    /// **************
    /// create a reference between two documents
    connect(host, key, doc) {
        return this.doc(host).update({ [key]: this.doc(doc).ref });
    }
    /// returns a documents references mapped to AngularFirestoreDocument
    docWithRefs$(ref) {
        return this.doc$(ref).map(doc => {
            for (const k of Object.keys(doc)) {
                if (doc[k] instanceof firebase.firestore.DocumentReference) {
                    doc[k] = this.doc(doc[k].path);
                }
            }
            return doc;
        });
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
    getId() {
        return this.afs.createId();
    }
    getBusId() {
        return __awaiter(this, void 0, void 0, function* () {
            const userProfile = yield firebase
                .firestore()
                .doc(`user/${this.userId}`)
                .get();
            console.log(userProfile);
            return userProfile.data().busId;
        });
    }
};
FirestoreProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFirestore, AngularFireAuth])
], FirestoreProvider);
export { FirestoreProvider };
//# sourceMappingURL=firestore.js.map