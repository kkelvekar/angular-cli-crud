import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle = 'Product Details';
    product: IProduct;
    errorMessage: string;

    constructor(private currentRoute: ActivatedRoute, private router: Router, private _productService: ProductService) {
    }

    ngOnInit(): void {
        // Simple concatination
        // this.pageTitle += this.currentRoute.snapshot.params["id"];

        // ES 2015 way
        const productId = this.currentRoute.snapshot.params['id'];

        this._productService.getProduct(productId)
            .subscribe(productResponse => this.product = productResponse,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/products']);
    }
}
