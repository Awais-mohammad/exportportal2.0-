import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'exportportal';

  constructor(

    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
  ) {
    this.checkLogin()
  }
  checkLogin() {
    const authsub = this.firebaseauth.authState.subscribe(cuser => {
      if (cuser) {
        if (cuser.uid) {
          this.firestore.collection('vendors').doc(cuser.uid).valueChanges().subscribe(data => {
            if (data == undefined) {
              console.log('user is not logged in as vendor');

            }
            else {

              console.log('user is logged in as vendor');


            }
          })
        }
        else {

        }
      }
      else {

      }
    })
  }



}
