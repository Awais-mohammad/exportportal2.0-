import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    private titleService: Title,
    private router: Router,
  ) { }

  topExporters: any;

  //get top exporters/

  gettopExporters() {
    const top = true
    this.firestore.collection('vendors', querry => querry.where('top', '==', top).orderBy('timestamp', 'asc')).valueChanges().subscribe((te: any) => {
      console.log('top exporters are', te);
      this.topExporters = te;
    })
  }

  viewExporter(uid: string) {
    this.router.navigate(['exporter-profile'], { state: { example: uid } });
  }

  ngOnInit(): void {
    this.gettopExporters()

    ////////////////////title services/////////////////////////////



  }

}
