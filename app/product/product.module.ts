import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductGuard } from './product-guard.service';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { HttpHelper } from '../shared/http-helper';

@NgModule({
  imports: [
    ReactiveFormsModule,
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
    HttpHelper
  ]
})
export class ProductModule { }
