import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent {


  constructor(public auth: AuthProvider) { }

}
