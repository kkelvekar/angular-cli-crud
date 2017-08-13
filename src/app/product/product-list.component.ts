import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

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
    errorMessage: string;

    constructor(private _productService: ProductService) { }

    ngOnInit(): void {
        this._productService.getProducts()
            .subscribe(productResponse => this.products = productResponse,
            error => this.errorMessage = <any>error);
    }

    toogleImage(): void {
        this.showImage = !this.showImage;
    }
}
