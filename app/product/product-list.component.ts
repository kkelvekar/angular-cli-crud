import { Component, OnInit } from '@angular/core';
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({   
    templateUrl: 'app/product/product-list.component.html',
    styleUrls: ['app/product/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 40;
    imageHeight: number = 40;
    showImage: boolean = false;
    filterBy: string;
    products: IProduct[];
    errorMessage:string;

    constructor(private _productService: ProductService) {
        
    }

    ngOnInit(): void {
         this._productService.getProduct()
                             .subscribe(productResponse => this.products = productResponse,
                                        error => this.errorMessage = <any>error);
    }

    toogleImage(): void {
        this.showImage = !this.showImage;
    }
}