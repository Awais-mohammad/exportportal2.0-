import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-exporters',
  templateUrl: './exporters.component.html',
  styleUrls: ['./exporters.component.scss']
})
export class ExportersComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    private router: Router,
  ) { }

  exporters: any;

  ///////get all registered exporters///////////
  allExporters() {
    const status = 'approved'
    this.firestore.collection('vendors', query => query.where('accountstatus', '==', status)).valueChanges().subscribe(exporters => {
      this.exporters = exporters
      console.log(this.exporters);


    })
  }

  viewExporter(uid: string) {
    this.router.navigate(['exporter-profile'], { state: { example: uid } });
  }

  ngOnInit(): void {
    this.allExporters()
  }

}
