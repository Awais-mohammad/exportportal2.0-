import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private fireStore: AngularFirestore,
    private router: Router,
  ) {
    this.getCats();
    setTimeout(() => {
      this.getProds("automotive");

      this.catIndex++;
    }, 3000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }
  /////lksdhosighosid

  width = window.innerWidth;
  categories: any;
  showCats: string[] = [];
  products: any[] = [];
  cat: string = "automotive";
  subCat: string;
  catIndex: number = 0;

  viewExporter(uid: string) {
    this.router.navigate(['exporter-profile'], { state: { example: uid } });
  }

  getCats() {
    const cats = this.fireStore.collection('appData').doc('categories').get().subscribe((data: any) => {
      console.log('data=>', data);

      if (data.exists) {
        this.categories = data.Df.sn.proto.mapValue.fields
        console.log('categories', this.categories);

      }
      else {
        console.log('no data found');

      }

    })
  }


  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  changeCat(cat: string) {
    this.products = [];
    this.cat = cat;
    this.getProds(cat);
  }

  showMore() {
    if (this.catIndex < this.categories.cats.arrayValue.values.length) {
      this.catIndex = this.catIndex + 1;
      this.getProds(this.categories.cats.arrayValue.values[this.catIndex].stringValue);
    }
  }

  getProds(cat: string) {
    console.log(cat);
    for (var i = 0; i < this.categories[cat].arrayValue.values.length; i++) {
      const subCat = this.categories[cat].arrayValue.values[i].stringValue;
      console.log("Checking >>> ", subCat);
      const getDocs = this.fireStore.collection('products').doc(cat).collection(subCat).get().subscribe((data: any) => {
        if (data.empty == false) {
          console.log('prod data-->', data);


          for (var k = 0; k < data.docs.length; k++) {
            if (data.kf.docChanges[k].doc.sn.proto.mapValue.fields != undefined) {
              this.products.push(data.kf.docChanges[k].doc.sn.proto.mapValue.fields);

            }
            if (k == data.docs.length - 1) {
              getDocs.unsubscribe();
            }
          }
        }
      })
    }
    console.log('products', this.products);

  }


  ngOnInit(): void {
    this.getCats()
  }

}
