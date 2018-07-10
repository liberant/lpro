import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    NgPipesModule,
    IonicPageModule.forChild(OrdersPage),
  ],
})
export class OrdersPageModule {}
