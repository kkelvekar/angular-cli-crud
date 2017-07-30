import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './app/product/product-edit.component.html',
    styleUrls: ['./app/product/product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    pageTitle: string;

    constructor(private currentRoute: ActivatedRoute) { }

    ngOnInit() {
        let productId = this.currentRoute.snapshot.params['id'];
        this.pageTitle = productId !== undefined ? 'Edit Product' : 'Add Product';
    }
}