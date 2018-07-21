import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

import { User } from '../../models/user-model';
import { Business } from '../../models/business-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';



@Injectable()
export class AuthProvider {
  private auth: Observable<firebase.User>;
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  business$: BehaviorSubject<Business> = new BehaviorSubject<Business>(null);

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, private storage: Storage) {
   this.auth = this.afAuth.authState;
   console.log('authstate: ', this.auth);
   this.auth.subscribe((user) => {
      if (user) {
        this.afs.doc<User>(`user/${user.uid}`).valueChanges().pipe(first()).subscribe(data => {
          this.user$.next(data);
          this.loadBusiness(data.busId);
        });
      }
    });
  }

  async getUserVal(val): Promise<string> {
    return this.user$.getValue()[val];
  }

  async loginUser(email: string, password: string): Promise<firebase.User> {
   const auth = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
   if (auth.user) {
     console.log(auth.user);
     this.afs.doc<User>(`user/${auth.user.uid}`).valueChanges().pipe(first()).subscribe(async data => {
       await this.storage.set('user', data).then(res => { console.log('storage: ', res); });
       await this.user$.next(data);
       this.loadBusiness(data.busId);
     }).unsubscribe();
    }
   return auth.user;
  }

  loadBusiness(busId) {
    if (busId) {
      this.afs.doc<Business>(`business/${busId}`).valueChanges().pipe(first()).subscribe(data => {
        this.business$.next(data);
        console.log('bus: ', data);
      });
    }
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.storage.clear().then(() => {
      return this.afAuth.auth.signOut();
    });
  }
}
