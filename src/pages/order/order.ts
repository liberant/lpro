import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { FirestoreProvider } from './../../providers/firestore/firestore';
import {AuthProvider} from "../../providers/auth";

import { Business} from "../../models/business-model";
import { Order } from '../../models/order-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orderList: Observable<Order[]>;
  retailer: Business;
  producer: Business;
  order: Order;
  busId: string;
  orderId: string;
  busType: string;
  focused: string;
  show: {
    variety: boolean;
    region: boolean;
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public sp: OrderProvider, public afs: FirestoreProvider, private auth: AuthProvider) {
    this.busId = auth.busId;
    this.orderId = navParams.get('id');
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    console.log(event);
    if (event.keyCode === 13 && this[this.focused] != null) {

      this.add(this.focused)
    }
    event.stopPropagation();

  }

  ionViewDidLoad() {
this.getData();

  }

  async getData() {
    await this.afs.doc$<Order>('order/'+this.orderId).subscribe(data => {
      this.order = data;
    });
    this.afs.doc$<Business>('business/'+this.order.rid).subscribe(data =>{
      this.retailer = data;
    })
    this.afs.doc$<Business>('business/'+this.order.pid).subscribe(data => {
      this.producer = data;
    })
  }


  public onFocus(target: string) {
    this.focused = target;
    console.log(this.focused)
  }

  edit(type, item) {
    this.focused = type;
    let prompt = this.alertCtrl.create({
      title: 'Edit ' + type,
      inputs: [
        {
          name: 'name',
          value: item.name,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            this.fs.update(type+'/'+item.id, data);
          },
        },
      ],
    });
    prompt.present();
  }


  add(type) {
    this.fs.add(type, { name: this[type] });
    this[type] = null;
  }

  rem(type, id) {

    let prompt = this.alertCtrl.create({
      title: 'Confirm Deletion',
      message: 'Do you really want to delete this ' + type + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.fs.delete(type+'/'+id);
          }
        }
      ]
    });
    prompt.present();
  }

}
