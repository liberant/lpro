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
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
let AuthProvider = class AuthProvider {
    constructor(afAuth, fireStore, storage) {
        this.afAuth = afAuth;
        this.fireStore = fireStore;
        this.storage = storage;
        afAuth.authState.subscribe(res => {
            if (res) {
                this.userId = res.uid;
                this.userRef = this.fireStore.doc('user/' + res.uid);
                this.userRef.valueChanges().subscribe(res => {
                    this.user = res;
                });
            }
        });
    }
    loginUser(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
    resetPassword(email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }
    logoutUser() {
        this.user;
        this.storage.clear();
        return this.afAuth.auth.signOut();
    }
    setIds() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                yield this.userRef.valueChanges().subscribe(res => {
                    this.user = res;
                });
                console.log('infunct' + this.user);
            }
            yield this.storage.set('uid', this.userId);
            yield this.storage.set('busId', this.user.busId);
            yield this.storage.set('type', this.user.busType);
            console.log(this.user);
        });
    }
    createAdminUser(password, firstName, lastName, email, phone, busType, busName, photoURL) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUserCredential = yield this.afAuth.auth
                    .createUserWithEmailAndPassword(email, password);
                const userProfileDocument = this.fireStore.doc(`user/${adminUserCredential.user.uid}`);
                const busId = this.fireStore.createId();
                yield userProfileDocument.set({
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
                const busProfile = this.fireStore.doc(`business/${busId}`);
                yield busProfile.set({
                    id: busId,
                    adminId: adminUserCredential.user.uid,
                    type: busType,
                    name: busName
                });
                return adminUserCredential.user;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    createRegularUser(email, busId) {
        return __awaiter(this, void 0, void 0, function* () {
            //const busId: string = await this.inventoryProvider.getbusId();
            const userCollection = this.fireStore.collection(`busProfile/${busId}/busMemberList`);
            const id = this.fireStore.createId();
            const regularUser = {
                id: id,
                email: email,
                busId: busId
            };
            return userCollection.add(regularUser);
        });
    }
};
AuthProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFireAuth,
        AngularFirestore,
        Storage])
], AuthProvider);
export { AuthProvider };
//# sourceMappingURL=auth.js.map