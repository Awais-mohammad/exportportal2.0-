import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exporter-profile',
  templateUrl: './exporter-profile.component.html',
  styleUrls: ['./exporter-profile.component.scss']
})
export class ExporterProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
  ) {

    // alert(this.router.getCurrentNavigation().extras.state.example);
    this.userID = this.router.getCurrentNavigation().extras.state.example
    this.getData(this.userID)
  }
  userID: string;
  exporterData: any;

  getData(id: string) {
    alert('get data for +' + id)
    this.firestore.collection('vendors').doc(id).valueChanges().subscribe(data => {
      console.log('exporterdata->', data);
      this.exporterData = data;
      this.getProd(id)
    })
  }
  products: any;
  getProd(id) {
    this.firestore.collection('vendors').doc(id).collection('products').valueChanges().subscribe(prods => {
      this.products = prods;
    })
  }

  ngOnInit(): void {
  }

}
