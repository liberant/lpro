import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WineListsPage } from './wine-lists';

@NgModule({
  declarations: [
    WineListsPage,
  ],
  imports: [
    IonicPageModule.forChild(WineListsPage),
  ],
})
export class WineListsPageModule {}
