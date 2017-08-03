import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './app/product/product-edit.component.html',
    styleUrls: ['./app/product/product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    pageTitle: string;
    editMode: boolean;
    productForm: FormGroup;

    constructor(private currentRoute: ActivatedRoute, private fb: FormBuilder) { }

    ngOnInit() {
        this.initViewMode();
        this.buildForm();
    }

    initViewMode(): void {
        let productId = this.currentRoute.snapshot.params['id'];
        this.editMode = productId !== undefined;
        this.pageTitle = this.editMode ? 'Edit Product' : 'Add Product';
    }

    buildForm(): void {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            productCode: ['', [Validators.required]],
            rating: '',
            tags: this.fb.array([]),
            description: ''
        });
    }
}