import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[fireForm]'
})
export class FireFormDirective implements OnInit, OnDestroy {

  // Inputs
  @Input() path: string;
  @Input() formGroup: FormGroup;

  // Internal state
  private _state: 'loading' | 'synced' | 'modified' | 'error';

  // Outputs
  @Output() stateChange = new EventEmitter<string>();
  @Output() formError = new EventEmitter<string>();

  // Firestore Document
  private docRef: AngularFirestoreDocument<any>;

  // Subscriptions
  private formSub: Subscription;

  constructor(private afs: FirestoreProvider) {
  }


  ngOnInit() {
    this.autoSave();
  }

  ionViewWillEnter() {
    if(this.path) {
      this.preloadData();
    }
  }

  // Loads initial form data from Firestore
  preloadData() {
    this.state = 'loading';
    this.docRef = this.getDocRef(this.path);
    this.docRef
      .valueChanges()
      .pipe(
        tap(doc => {
          if (doc) {
            this.formGroup.patchValue(doc);
            this.formGroup.markAsPristine();
            this.state = 'synced';
          }
        }),
        take(1)
      )
      .subscribe();
  }


  // Autosaves form changes
  autoSave() {
    this.formSub = this.formGroup.valueChanges
      .pipe(
        tap(change => {
          this.state = 'modified';
        }),
        debounceTime(2000),
        tap(change => {
          if (this.formGroup.valid && this._state === 'modified') {
            this.setDoc();
          }
        })
      )
      .subscribe();
  }

  // Intercept form submissions to perform the document write
  @HostListener('ngSubmit', ['$event'])
  onSubmit(e) {
    this.setDoc();
  }


  // Determines if path is a collection or document
  getDocRef(path: string): any {
    if (path.split('/').length % 2) {
      return this.afs.doc(`${path}/${this.afs.getId()}`);
    } else {
      return this.afs.doc(path);
    }
  }

  // Writes changes to Firestore
  async setDoc() {
    try {
      await this.docRef.set(this.formGroup.value, { merge: true });
      this.state = 'synced';
    } catch (err) {
      console.log(err);
      this.formError.emit(err.message);
      this.state = 'error';
    }
  }

  // Setter for state changes
  set state(val) {
    this._state = val;
    this.stateChange.emit(val);
  }

  ngOnDestroy() {
    if(this.formSub) {
      this.formSub.unsubscribe();
    }
  }

}
