var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
let UsersProvider = class UsersProvider {
    constructor(afAuth, afs) {
        this.afAuth = afAuth;
        this.afs = afs;
        afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
        });
    }
    getList(path) {
        return this.afs.collection(`${path}`);
    }
    get(path) {
        return this.afs.doc(`${path}`);
    }
    add(path, data) {
        return this.afs.collection(`${path}`).add(data);
    }
    update(path, id, data) {
        return this.afs.doc(`${path}/${id}`).update(data);
    }
    delete(path, id) {
        return this.afs.doc(`${path}/${id}`).delete();
    }
};
UsersProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFireAuth, AngularFirestore])
], UsersProvider);
export { UsersProvider };
//# sourceMappingURL=users.js.map