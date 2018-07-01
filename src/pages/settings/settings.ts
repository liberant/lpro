import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { FirestoreProvider } from './../../providers/firestore/firestore';

import { Item } from '../../models/common-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
regionList: Observable<Item[]>;
varietyList: Observable<Item[]>;
variety: string;
region: string;
focused: string;
  show: {
    variety: boolean;
    region: boolean;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public sp: SettingsProvider, public fs: FirestoreProvider) {
    this.show = {variety: true, region: true }
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    console.log(event);
    if (event.keyCode === 13 && this[this.focused] != null) {
      
      this.add(this.focused)
    }
    event.stopPropagation();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.regionList = this.fs.colWithIds$<Item>('region')

    this.varietyList = this.fs.colWithIds$<Item>('variety')

 }


  toggleShow(prop) {
    this.show[prop] = !this.show[prop];
      }
    
      public onFocus(target: string) {
        this.focused = target;
        console.log(this.focused)
      }
    
      edit(type, item) {
        this.focused = type;
        let prompt = this.alertCtrl.create({
          title: 'Edit ' + type,
          inputs: [
            {
              name: 'name',
              value: item.name,
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              },
            },
            {
              text: 'Save',
              handler: data => {
                console.log(data);
                this.fs.update(type+'/'+item.id, data);
              },
            },
          ],
        });
        prompt.present();
      }
    
    
      add(type) {
        this.fs.add(type, { name: this[type] })
        this[type] = null;
      }
    
      rem(type, id) {
        
        let prompt = this.alertCtrl.create({
          title: 'Confirm Deletion',
          message: 'Do you really want to delete this ' + type + '?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Yes',
              handler: () => {
                this.fs.delete(type+'/'+id);
              }
            }
          ]
        });
        prompt.present();
      }

}
