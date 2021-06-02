import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'exporters',
    component:ExportersComponent
  },
  {
    path:'about',component:AboutComponent
  },
  {
    path:'contact',component:ContactusComponent
  },
  {path:'news' , component:NewsComponent},
  {path:'addproduct',component:AddProductComponent},
  {path:'detail',component:DetailpageComponent},
  {path:'company-info',component:EditCompanyinfoComponent},
  {path:'info',component:PersonalinfoComponent},
  {path:'exporter-profile' ,component:ExporterProfileComponent},
  {path:'news-detail',component:NewsDetailsComponent},
  {path:'product',component:ProductsComponent},
  {path:'register',component:RegistrationComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

export const routingConponents = [
  HomeComponent
]