import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpModule } from "@angular/http"
import { RouterModule } from "@angular/router"

import { AppComponent } from './app.component';
import { ProductDetailGuard } from './product/product-guard.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { StarComponent } from './shared/star.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot([
      {path:"products",component: ProductListComponent},
      {path:"product/:id",canActivate:[ProductDetailGuard],component: ProductDetailComponent},
      {path:"welcome",component: WelcomeComponent},
      {path:"",redirectTo:"welcome",pathMatch:"full"}   
    ])
  ],
  declarations: [AppComponent, WelcomeComponent,ProductListComponent, ProductDetailComponent ,ProductFilterPipe, StarComponent],
  providers:[ProductDetailGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
