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
import { FirestoreProvider } from '../../providers/firestore/firestore';
let OrdersProvider = class OrdersProvider {
    constructor(afs) {
        this.afs = afs;
        console.log('Hello OrdersProvider Provider');
    }
    placeOrder(prod) {
        return __awaiter(this, void 0, void 0, function* () {
            const oid = yield this.afs.getId();
            let rid = yield this.afs.getBusId();
            let retailer = yield this.afs.get('business/' + rid, 'name');
            let price = prod.qty * prod.unitCost;
            let today = new Date();
            let newOrder = {
                id: oid,
                rid: rid,
                retailer: retailer,
                pid: prod.pid,
                producer: prod.producer,
                prodId: prod.id,
                prodName: prod.name,
                qty: prod.qty,
                price: prod.unitCost,
                total: price,
                orderDate: today,
                approved: false,
                shipped: false,
                received: false
            };
            console.log(newOrder);
            this.afs.update('business/' + rid + '/winelist/' + prod.id, { qty: null });
            return this.afs.set('orders/' + oid, newOrder);
        });
    }
};
OrdersProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [FirestoreProvider])
], OrdersProvider);
export { OrdersProvider };
//# sourceMappingURL=orders.js.map