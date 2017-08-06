import { ProductService } from './product.service';
import { IProduct } from './product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { GenericValidator } from '../shared/generic-validator';
import { NumberValidator } from '../shared/number-validator';

@Component({
    templateUrl: './app/product/product-edit.component.html',
    styleUrls: ['./app/product/product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
    pageTitle: string;
    editMode: boolean;
    productForm: FormGroup;
    product: IProduct;
    genericValidator: GenericValidator;
    validationMessages: { [key: string]: { [key: string]: string } };
    displayMessage: { [key: string]: string } = {};

    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }

    constructor(private currentRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private productService: ProductService) {
        this.validationMessages = {
            productName: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            productCode: {
                required: 'Product code is required.'
            },
            price: {
                required: 'Price is required.',
                pattern: 'Price is invalid.'
            },
            starRating: {
                range: 'Rate the product between 1 (lowest) and 5 (highest).'
            }
        };
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

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
            productCode: ['', Validators.required],
            price: ['', Validators.required],
            starRating: ['', NumberValidator.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });
        this.initValidation();
    }

    initValidation() {
        this.productForm.valueChanges.debounceTime(1000).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.productForm);
        });
    }

    addTag() {
        this.tags.push(new FormControl());
    }

    removeTag(index: number) {
        this.tags.removeAt(index);
    }

    submit(): void {
        let product = Object.assign({}, this.product, this.productForm.value);
        if (this.editMode) {
            this.productService.updateProduct(product)
                .subscribe(() => this.onSaveComplete());
        } else {
            this.productService.addProduct(product)
                .subscribe(() => this.onSaveComplete());
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.productForm.reset();
        this.router.navigate(['/products']);
    }
}