import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent }  from './app.component';
import { ProductListComponent }  from './product/product-list.component';
import { ProductFilterPipe }  from './product/product-filter.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule ],
  declarations: [ AppComponent,ProductListComponent,ProductFilterPipe ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
