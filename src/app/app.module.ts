import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExportersComponent } from './exporters/exporters.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NewsComponent } from './news/news.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { EditCompanyinfoComponent } from './edit-companyinfo/edit-companyinfo.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { ExporterProfileComponent } from './exporter-profile/exporter-profile.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { ProductsComponent } from './products/products.component';
import { RegistrationComponent } from './registration/registration.component';

/*
HTTP CLIENT
*/


import { HttpClientModule } from '@angular/common/http';

/*
firebase imports
*/

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ExportersComponent,
    AboutComponent,
    ContactusComponent,
    NewsComponent,
    AddProductComponent,
    DetailpageComponent,
    EditCompanyinfoComponent,
    PersonalinfoComponent,
    ExporterProfileComponent,
    NewsDetailsComponent,
    ProductsComponent,
    RegistrationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
