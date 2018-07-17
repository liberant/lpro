import { Component, ViewChild } from '@angular/core';
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams, Content
} from 'ionic-angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FirestoreProvider } from '../../providers/firestore/firestore';

import { Business } from '../../models/business-model';

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
  @ViewChild('businessProfile') content: Content;

  id: string;
  business: Business;
  businessForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public fs: FirestoreProvider
  ) {
    this.id = navParams.get('id');
    this.businessForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
           // photoURL: [''],
      website: ['', Validators.compose([Validators.required])],
      phone: [''],
      email: [''],
      type: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    if (this.id) {
      this.fs.doc$<Business>('business/' + this.id) //.valueChanges()
       .subscribe(data =>{
         this.patchForm(data);
       });
       console.log(this.business);
   }
   this.content.resize();
    }


  patchForm(business?: Business) {
    this.businessForm.patchValue({
      name: business.name,
           // photoURL: business.photoURL,
      website: business.website,
      phone: business.phone,
      email: business.email,
      type: business.type
    });
  }

  editBusiness() {
    console.log(this.businessForm.value);
    this.fs.upsert('business/'+this.id, this.businessForm.value)

  }


}
