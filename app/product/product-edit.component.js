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
var ProductEditComponent = (function () {
    function ProductEditComponent(currentRoute, fb) {
        this.currentRoute = currentRoute;
        this.fb = fb;
    }
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
            productCode: ['', [forms_1.Validators.required]],
            rating: '',
            tags: this.fb.array([]),
            description: ''
        });
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