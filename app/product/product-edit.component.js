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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
var generic_validator_1 = require("../shared/generic-validator");
var number_validator_1 = require("../shared/number-validator");
var ProductEditComponent = (function () {
    function ProductEditComponent(currentRoute, fb) {
        this.currentRoute = currentRoute;
        this.fb = fb;
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
    ProductEditComponent.prototype.addTag = function () {
        this.tags.push(new forms_1.FormControl());
    };
    ProductEditComponent.prototype.removeTag = function (index) {
        this.tags.removeAt(index);
    };
    return ProductEditComponent;
}());
ProductEditComponent = __decorate([
    core_1.Component({
        templateUrl: './app/product/product-edit.component.html',
        styleUrls: ['./app/product/product-edit.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, forms_1.FormBuilder])
], ProductEditComponent);
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map