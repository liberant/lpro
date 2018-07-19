import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    NgPipesModule,
    IonicPageModule.forChild(ProductsPage),
  ],
})
export class ProductsPageModule {}
