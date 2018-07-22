import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WinesPage } from './wines';

@NgModule({
  declarations: [ WinesPage, ], imports: [ IonicPageModule.forChild(WinesPage), ],
})
export class WinesPageModule {
}
