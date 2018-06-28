import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { Region } from '../../models/common-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  newRegion: Region;
regionsList: Observable<Region[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public settingsProvider: SettingsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.regionsList = this.settingsProvider.getRegionsList().snapshotChanges().pipe(
      map(actions => actions.map(a=> {
        const data = a.payload.doc.data() as Region;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }


}
