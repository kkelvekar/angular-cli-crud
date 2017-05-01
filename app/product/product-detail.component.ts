import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"

@Component({
    templateUrl: 'app/product/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit
{
    pageTitle: string = "Product Details";

    constructor(private currentRoute: ActivatedRoute, private router: Router)
    {
    }

    ngOnInit(): void
    {
        //Simple concatination
        //this.pageTitle += this.currentRoute.snapshot.params["id"];

        //ES 2015 way
        let productId = +this.currentRoute.snapshot.params["id"];
        this.pageTitle += `: ${productId}`;
    }

    onBack(): void
    {
        this.router.navigate(['/products']);
    }
}