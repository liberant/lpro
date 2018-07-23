import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { OrdersProvider } from '../../providers/orders/orders';

import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { Business } from '../../models/business-model';
import { Order } from '../../models/order-model';

import { GroupByPipe, PairsPipe } from 'ngx-pipes';


@IonicPage() @Component({
  selector: 'page-wine-list',
  templateUrl: 'wine-list.html',
  providers: [GroupByPipe, PairsPipe],
})
export class WineListPage {
  user: User;
  business: Business;
  productsList: Observable<Product[]>;
  groupvar = 'region';
  ordervar = 'unitCost';
  showUser = false;
  arrow = 'arrow-dropdown';

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public auth: AuthProvider, public viewCtrl: ViewController, public toastCtrl: ToastController, public op: OrdersProvider, public groupBy: GroupByPipe, public pairs: PairsPipe) {
    this.user = this.auth.user$.value;
    this.business = this.auth.business$.value;
  }

  ionViewDidLoad() {
    this.op.load(this.user.busId);
    this.productsList = this.op.wineList.asObservable();
  }


  detail(id: string) {
    this.navCtrl.push('ProductPage', { id });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  saveQty(id: string, qty) {
    qty = parseFloat(qty);
    this.afs.update<Product>(`business/${this.business.id}/winelist/${id}`, { qty });
    // this.op.presentToast(`${qty} bottles were added to yor cart`);
  }
  order() {
    const orderItems = [];
    this.productsList.subscribe(product => {
      product.forEach(prod => {
        if (prod.qty >= 1) {
          orderItems.push(prod);
        }
        });
    }).unsubscribe();
    const producers = this.groupBy.transform(orderItems, 'producer');
    for (const i in producers) {
    console.log(producers[i]);
    this.op.placeOrder(this.business, producers[i]);
    }
  }

  showuser() {
    return this.showUser = !this.showUser;
  }
}
