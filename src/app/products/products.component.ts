import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private fireStore: AngularFirestore,
  ) { }

  categories: any;


  getCats() {
    const cats = this.fireStore.collection('appData').doc('categories').get().subscribe((data: any) => {

      if (data.exists) {
        this.categories = data._delegate._document.data.value.mapValue.fields
        console.log(this.categories);

      }
      else {
        console.log('no data found');

      }

    })
  }

  ngOnInit(): void {
    this.getCats()
  }

}
