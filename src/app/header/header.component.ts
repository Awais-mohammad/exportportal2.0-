import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
  ) { }

  name: string;
  email: string;
  password: string;
  cpas: string;
  phone: number;
  category: string;
  city: string;
  country: string;
  cname: string;
  choosedcat: string
  cats: any;
  categories: any[] = [];
  pass: boolean = false;
  pastyp: string = 'password'
  imageURL: string;
  selectedFiles: FileList;
  currentFile: File;

  /////////get cats/////////////////
  getCategories() {
    const cats = this.firestore.collection('appData').doc('categories').valueChanges().subscribe((data) => {

      this.cats = data;
      console.log('categories are ', this.cats);


    })
  }


  /////////SIGN UP VALIDATION/////////////////
  validation() {
    if (!this.name) {
      alert('name cannot be left blank')
    }
    else if (!this.phone) {

      alert('phone cannot be left blank')
    }
    else if (!this.cname) {

      alert('cname cannot be left blank')
    }
    else if (!this.cpas) {

      alert('cpas cannot be left blank')
    }
    else if (!this.password) {

      alert('pas cannot be left blank')
    }
    else if (!this.choosedcat) {

      alert('category cannot be left blank')
    }
    else if (!this.email) {

      alert('email cannot be left blank')
    }
    else if (this.password != this.cpas) {

      alert('passes are different')
    }
    else if (!this.country) {

      alert('country cannot be left blank')
    }
    else if (!this.city) {

      alert('city cannot be left blank')
    }
    else if (!this.checked) {

      alert('accept our privacy policy dear')
    }
    else if (!this.imageURL) {
      alert('add a company logo to continue')
    }

    else {
      this.createUser()


    }
  }

  //////////////signUp////////////////////////
  createUser() {
    this.firebaseauth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {

      const userID = user.user.uid;
      const timestamp = new Date()
      const name = this.name.toLocaleLowerCase()
      const phone = this.phone
      const adress = this.country.toLocaleLowerCase()
      const accountstatus = 'notapproved'
      const category = this.choosedcat;
      const companyEmail = this.email.toLocaleLowerCase()
      const imageURL = this.imageURL
      const top = true
      this.firestore.collection('vendors').doc(userID).set({
        userID, name, timestamp, phone, adress, accountstatus, category, companyEmail, imageURL, top,
      }).then(() => {

        this.login()

      }).catch(err => {
        console.log(err.message);

      })

    }).catch((err) => {
      console.log(err.message);

    })
  }


  ///////////////////login validator////////////////////
  validate() {
    if (!this.email) {
      alert('email empty')
    }
    else if (!this.password) {
      alert('passs empty')
    }
    else {
      this.login()
      $('.loginModal').hide();
    }
  }

  loggedIn: boolean = true;
  ///////////////////login validator////////////////////

  login() {
    this.firebaseauth.signInWithEmailAndPassword(this.email, this.password).then(user => {

      this.firestore.collection('vendors').doc(user.user.uid).valueChanges().subscribe(data => {
        if (data == undefined) {
          this.firebaseauth.signOut()
          console.log('fata not dounf');

        }
        else {
          console.log('tada logged in');

          this.loggedIn = false;
          localStorage.setItem('log', 'true');

          this.router.navigateByUrl('/exporter-profile', { queryParams: { id: user.user.uid } })
        }
      })

    }).catch(err => {
      alert(err.message)
    })

  }

  success: string;
  error: string;
  ///////////////////////////reset pas//////////////////////
  resetPas() {
    this.firebaseauth.sendPasswordResetEmail(this.email).then((msg: any) => {
      this.success = msg
    }).catch(err => {
      this.error = err.message
    })
  }

  /////////upload file to server/////////////////
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'https://www.exportportal.site/uploadimage.php', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


  /////////select file/////////////////
  selectFile(event) {
    console.log('method called');

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


  /////////show hide password/////////////////
  passtoggler() {
    this.pass = !this.pass
    if (!this.pass) {
      this.pastyp = 'password'
    }
    else if (this.pass) {
      this.pastyp = 'text'
    }
  }


  /////////get user cat/////////////////
  onClick(item) {
    console.log(item);
    this.choosedcat = item
  }

  checked: boolean = false;


  /////////terms nd canditions/////////////////
  yes(i) {
    this.checked = !this.checked
  }

  /////////////check login

  checkLogin() {
    const authsub = this.firebaseauth.authState.subscribe(cuser => {

      if (cuser && cuser.uid) {
        this.firestore.collection('vendors').doc(cuser.uid).valueChanges().subscribe(data => {
          console.log(data)
          if (data == undefined) {
            console.log('user is not logged in as vendor');

          }
          else {
            this.loggedIn = false;
            console.log('user is not logged in as vendor');
          }
        })
      }

    })
  }

  logout() {
    this.firebaseauth.signOut().then(() => {
      this.router.navigate(['/home'])
    }).catch(() => {
      alert('unable to signout')
    })
  }

  ngOnInit(): void {
    this.getCategories()
    if (this.choosedcat) {
      alert('choosed' + this.choosedcat)
    }
    this.checkLogin()

  }

}
