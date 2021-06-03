import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
  ) { }

  topExporters: any;

  //get top exporters/

  gettopExporters() {
    const top = true
    this.firestore.collection('vendors', querry => querry.where('top', '==', top)).valueChanges().subscribe((te: any) => {
      console.log('top exporters are', te);
      this.topExporters = te;
    })
  }
  ngOnInit(): void {
    // this.gettopExporters()



  }

}
