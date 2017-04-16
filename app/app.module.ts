import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent }  from './app.component';
import { ProductListComponent }  from './product/product-list.component';
import { ProductFilterPipe }  from './product/product-filter.pipe';
import { StarComponent }  from './shared/star.component';

@NgModule({
  imports: [BrowserModule, FormsModule ],
  declarations: [ AppComponent,ProductListComponent,ProductFilterPipe,StarComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
