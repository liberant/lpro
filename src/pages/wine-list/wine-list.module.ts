import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WineListPage } from './wine-list';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [ WineListPage, ], imports: [ NgPipesModule, IonicPageModule.forChild(WineListPage), ],
})
export class WineListPageModule {
}
