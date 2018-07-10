import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShortListPage } from './short-list';

@NgModule({
  declarations: [
    ShortListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShortListPage),
  ],
})
export class ShortListPageModule {}
