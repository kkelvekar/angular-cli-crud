"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_service_1 = require("./product.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
var generic_validator_1 = require("../shared/generic-validator");
var number_validator_1 = require("../shared/number-validator");
var ProductEditComponent = (function () {
    function ProductEditComponent(currentRoute, router, fb, productService) {
        this.currentRoute = currentRoute;
        this.router = router;
        this.fb = fb;
        this.productService = productService;
        this.displayMessage = {};
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
        this.genericValidator = new generic_validator_1.GenericValidator(this.validationMessages);
    }
    Object.defineProperty(ProductEditComponent.prototype, "tags", {
        get: function () {
            return this.productForm.get('tags');
        },
        enumerable: true,
        configurable: true
    });
    ProductEditComponent.prototype.ngOnInit = function () {
        this.initViewMode();
        this.buildForm();
        this.initProduct();
    };
    ProductEditComponent.prototype.initViewMode = function () {
        var productId = this.currentRoute.snapshot.params['id'];
        this.editMode = productId !== undefined;
        this.pageTitle = this.editMode ? 'Edit Product' : 'Add Product';
    };
    ProductEditComponent.prototype.buildForm = function () {
        this.productForm = this.fb.group({
            productName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(30)]],
            productCode: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
            starRating: ['', number_validator_1.NumberValidator.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });
        this.initValidation();
    };
    ProductEditComponent.prototype.initValidation = function () {
        var _this = this;
        this.productForm.valueChanges.debounceTime(1000).subscribe(function (value) {
            _this.displayMessage = _this.genericValidator.processMessages(_this.productForm);
        });
    };
    ProductEditComponent.prototype.initProduct = function () {
        var _this = this;
        if (this.editMode) {
            var productId = this.currentRoute.snapshot.params['id'];
            this.productService.getProduct(productId)
                .subscribe(function (productResponse) { return _this.onProductRetrieved(productResponse); });
        }
    };
    ProductEditComponent.prototype.onProductRetrieved = function (product) {
        if (this.productForm) {
            this.productForm.reset();
        }
        this.product = product;
        // Update the data on the form
        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            price: this.product.price,
            description: this.product.description
        });
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    };
    ProductEditComponent.prototype.addTag = function () {
        this.tags.push(new forms_1.FormControl());
    };
    ProductEditComponent.prototype.removeTag = function (index) {
        this.tags.removeAt(index);
    };
    ProductEditComponent.prototype.submit = function () {
        var _this = this;
        var product = Object.assign({}, this.product, this.productForm.value);
        if (this.editMode) {
            this.productService.updateProduct(product)
                .subscribe(function () { return _this.onSaveComplete(); });
        }
        else {
            this.productService.addProduct(product)
                .subscribe(function () { return _this.onSaveComplete(); });
        }
    };
    ProductEditComponent.prototype.onSaveComplete = function () {
        // Reset the form to clear the flags
        this.productForm.reset();
        this.router.navigate(['/products']);
    };
    return ProductEditComponent;
}());
ProductEditComponent = __decorate([
    core_1.Component({
        templateUrl: './app/product/product-edit.component.html',
        styleUrls: ['./app/product/product-edit.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        product_service_1.ProductService])
], ProductEditComponent);
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map