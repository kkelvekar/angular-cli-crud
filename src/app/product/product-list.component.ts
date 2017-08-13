import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { ErrorService } from 'app/shared/error.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  imageWidth = 40;
  imageHeight = 40;
  showImage = false;
  filterBy: string;
  products: IProduct[];

  constructor(private _productService: ProductService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this._productService.getProducts()
      .subscribe(productResponse => this.products = productResponse,
      error => this.errorService.redirectToErrorPage(error));
  }

  toogleImage(): void {
    this.showImage = !this.showImage;
  }
}
