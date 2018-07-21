import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WineListPage } from './wine-list';
import { NgPipesModule } from 'ngx-pipes';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsIonicUIModule } from '@ng-dynamic-forms/ui-ionic';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WineListPage,
  ],
  imports: [
    NgPipesModule,
    IonicPageModule.forChild(WineListPage),
    ReactiveFormsModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsIonicUIModule,
  ],
})
export class WineListPageModule {}
