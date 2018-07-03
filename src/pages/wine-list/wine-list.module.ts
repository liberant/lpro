import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WineListPage } from './wine-list';

@NgModule({
  declarations: [
    WineListPage,
  ],
  imports: [
    IonicPageModule.forChild(WineListPage),
  ],
})
export class WineListPageModule {}
