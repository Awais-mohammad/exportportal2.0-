import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private fireStore: AngularFirestore,
    private http: HttpClient,
    private auth: AngularFireAuth,
    private Router: Router,
  ) {
    this.getCats()
  }

  categories: any;
  selectedcat: string = "automotive";
  temp: any;
  cats: any;
  subCats: string;
  width = window.innerWidth;
  prodName: string;
  prodDescription: string;
  showproductFrom: boolean = false;
  loadermsg: string;
  loaderID: string;
  currentUID: string;
  prodPrice: number;


  getCats() {
    this.fireStore.collection('appData').doc('categories').valueChanges().subscribe((data: any) => {
      this.categories = data;
      this.temp = data
      this.cats = this.categories.cats;

    })
  }

  choosecat(selested: string) {
    this.selectedcat = selested


  }
  /////////get user cat/////////////////
  onClick(item) {
    console.log(item);
    this.choosedcat = item
  }

  selectedFiles: FileList;
  currentFile: File;
  msg;
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'https://www.exportportal.site/uploadimage.php', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  imageURL: string;

  /////////select file/////////////////
  selectFile(event) {


    this.selectedFiles = event.target.files;

    this.imageURL = 'https://www.exportportal.site/vendors/' + this.selectedFiles[0].name
    this.upload()
  }


  /////////upload file/////////////////
  upload() {

    this.currentFile = this.selectedFiles.item(0);
    this.uploadFile(this.currentFile,).subscribe(response => {
      if (response instanceof HttpResponse) {
        alert(response.body);

      }
    });
    return;
  }



  getDocID(doc, subcol) {
    const docID = firebase.firestore().collection('products').doc(doc).collection(subcol).doc().id
    return docID
  }
  checked: boolean;
  choosedcat: string;

  addRecord() {
    this.checked = true;
    if (!this.choosedcat) {
      alert('choose a category')
      this.checked = false;
    }
    else if (!this.subCats) {
      alert('choose a sub category')
      this.checked = false;
    }
    else if (!this.prodDescription) {
      alert('Add Product description')
      this.checked = false;
    }
    else if (!this.prodName) {
      alert('add product name')
      this.checked = false;
    }
    else if (!this.imageURL) {
      alert('choose an image')
      this.checked = false;
    }
    else if (!this.prodPrice) {
      alert('Invalid field price!!')
      this.checked = false;
    }
    else {

      const docID = this.getDocID(this.choosedcat, this.subCats)
      const productName = this.prodName
      const productDescription = this.prodDescription
      const addedAt = new Date()
      const uploadedBy = this.currentUID
      const imageURL = this.imageURL
      const status = 'approved'
      const price = this.prodPrice
      this.fireStore.collection('products').doc(this.choosedcat).collection(this.subCats).doc(docID).set({
        docID,
        productName,
        productDescription,
        addedAt,
        uploadedBy,
        imageURL,
        price,
        status
      }).then(() => {

        const prodDocID = firebase.firestore().collection('vendors').doc(this.currentUID).collection('products').doc().id;
        const docID = prodDocID
        this.fireStore.collection('vendors').doc(this.currentUID).collection('products').doc(prodDocID).set({
          docID,
          productName,
          productDescription,
          addedAt,
          uploadedBy,
          imageURL,

          price,
          status

        }).then(hi => {
          this.checked = false;
          // this.close()
          alert('data added')
        })

      }).catch(err => {
        this.checked = false;
        alert(err.message)
      })

    }
  }

  choosesubcat(selested: string) {
    this.subCats = selested

  }

  ngOnInit(): void {

    setTimeout(() => {

      this.currentUID = this.auth.auth.currentUser.uid

    }, 3000);

  }

}
