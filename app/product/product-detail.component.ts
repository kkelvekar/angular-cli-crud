import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/product/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Details';
    product: IProduct;
    errorMessage: string;

    constructor(private currentRoute: ActivatedRoute, private router: Router, private _productService: ProductService) {
    }

    ngOnInit(): void {
        // Simple concatination
        // this.pageTitle += this.currentRoute.snapshot.params["id"];

        // ES 2015 way
        let productId = this.currentRoute.snapshot.params['id'];

        this._productService.getProduct(productId)
            .subscribe(productResponse => this.product = productResponse,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/products']);
    }
}