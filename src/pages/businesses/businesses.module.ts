import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessesPage } from './businesses';

@NgModule({
  declarations: [
    BusinessesPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessesPage),
  ],
})
export class BusinessesPageModule {}
