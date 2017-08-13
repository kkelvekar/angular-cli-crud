
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule } from 'ngx-bootstrap';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductGuard } from './product-guard.service';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';
import { ProductMapping } from './product-mapping';

import { SharedModule } from '../shared/shared.module';
import { HttpHelper } from '../shared/helpers/http-helper';

@NgModule({
  imports: [
    ReactiveFormsModule,
    DatepickerModule.forRoot(),
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'product-add', component: ProductEditComponent },
      { path: 'product-edit/:id', canActivate: [ProductGuard], component: ProductEditComponent },
      { path: 'product/:id', canActivate: [ProductGuard], component: ProductDetailComponent },
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductGuard,
    ProductMapping,
    HttpHelper
  ]
})
export class ProductModule { }
