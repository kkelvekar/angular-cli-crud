import { ProductService } from './product.service';
import { IProduct } from './product';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import * as moment from 'moment';
import { ErrorService } from 'app/shared/error.service';


import { GenericValidator } from '../shared/helpers/generic-validator';
import { NumberValidator } from '../shared/helpers/number-validator';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle: string;
  editMode: boolean;
  productForm: FormGroup;
  productId: string;
  product: IProduct;
  genericValidator: GenericValidator;
  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};
  displayCalender = false;

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(private currentRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private errorService: ErrorService,
    private cdRef: ChangeDetectorRef) {
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

  ngAfterViewChecked() {
    // explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.initViewMode();
    this.buildForm();
    this.initProduct();
  }

  initViewMode(): void {
    this.productId = this.currentRoute.snapshot.params['id'];
    this.editMode = this.productId !== undefined;
    this.pageTitle = this.editMode ? 'Edit Product' : 'Add Product';
  }

  buildForm(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      productCode: ['', Validators.required],
      price: ['', [Validators.required]],
      releaseDate: [''],
      calenderReleaseDate: new Date(),
      starRating: ['', NumberValidator.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });
    this.initValidation();
  }

  initValidation(): void {
    this.productForm.valueChanges.debounceTime(1000).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }

  initProduct(): void {
    if (this.editMode) {
      this.productService.getProduct(this.productId)
        .subscribe(productResponse => this.onProductRetrieved(productResponse),
        error => this.errorService.redirectToErrorPage(error));
    }
  }

  onProductRetrieved(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset({
        calenderReleaseDate: new Date() // To handle null exception from datetimepicker component from ngx-bootstrap
      });
    }
    this.product = product;

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      releaseDate: this.product.releaseDate,
      calenderReleaseDate: this.product.releaseDate === '' ? moment() : moment(this.product.releaseDate, 'DD/MM/YYYY'),
      starRating: this.product.starRating,
      price: this.product.price,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  toogleCalender() {
    this.displayCalender = !this.displayCalender;
  }

  onReleaseDateSelected() {
    this.displayCalender = false;
    const selectedDate = this.productForm.get('calenderReleaseDate').value;
    this.productForm.patchValue({
      releaseDate: selectedDate !== null ? moment(selectedDate).format('DD/MM/YYYY') : ''
    });

  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  submit(): void {
    const product = Object.assign({}, this.product, this.productForm.value);
    if (this.editMode) {
      this.productService.updateProduct(product)
        .subscribe(() => this.onSaveComplete(), error => this.errorService.redirectToErrorPage(error));
    } else {
      this.productService.addProduct(product)
        .subscribe(() => this.onSaveComplete(), error => this.errorService.redirectToErrorPage(error));
    }
  }

  delete(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.productId)
        .subscribe(() => this.onSaveComplete(), error => this.errorService.redirectToErrorPage(error));
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset({
      calenderReleaseDate: new Date() // To handle null exception from datetimepicker component from ngx-bootstrap
    });
    this.router.navigate(['/products']);
  }
}
