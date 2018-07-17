import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";
import { FirestoreProvider } from "../../providers/firestore/firestore";
import { AuthProvider } from "../../providers/auth/auth";
import { Order } from "../../models/order-model";
import { OrderByPipe, GroupByPipe } from "ngx-pipes";
//import { NgPipesModule } from 'ngx-pipes';

@IonicPage()
@Component({
  selector: "page-orders",
  templateUrl: "orders.html",
  providers: [OrderByPipe, GroupByPipe],
})
export class OrdersPage {
  public busType;
  public busId: string;
  public ordersList: Observable<Order[]>;
  public business: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: FirestoreProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private auth: AuthProvider,
    private storage: Storage,
    private orderby: OrderByPipe,
    private groupby: GroupByPipe,
  ) {
    this.busId = this.auth.busId;
    this.busType = this.auth.busType;
  }

  async getUser(){
    this.busType = await this.storage.get('type');
    this.busId = await this.storage.get('busId');
  }

  ionViewDidLoad() {

    this.getUser().then(res =>{
    this.getOrders();
  })
}

  async getOrders() {
    if (this.busType === "Retailer") {
      this.business = 'producer';
      this.ordersList =   this.orderby.transform(
        this.afs.col$<Order>("orders", ref => {
          return ref.where("rid", "==", this.busId);
        }),
        ["submitted", "approved", "shipped", "received"]
      );
    } else if (this.busType === "Producer") {
      this.business = 'retailer';

      this.ordersList = this.orderby.transform(
        this.afs.col$<Order>("orders", ref => {
          return ref.where("pid", "==", this.busId);
        }),
        ["submitted", "approved", "shipped", "received"]
      );
    } else {
      console.log("All Orders");
      this.ordersList = this.orderby.transform(
        this.afs.col$<Order>("orders"),
        ["submitted", "approved", "shipped", "received"]
      );
    }
  }

  detail(id: string) {
    this.navCtrl.push("OrderPage", { id: id });
  }

  addToList(type: string, order: Order) {
    this.afs
      .upsert("business/" + this.busId + "/" + type + "/" + order.id, order)
      .then(res => {
        this.presentToast("Wine added successfully");
      });
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
