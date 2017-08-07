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
var product_service_1 = require("./product.service");
var ProductDetailComponent = (function () {
    function ProductDetailComponent(currentRoute, router, _productService) {
        this.currentRoute = currentRoute;
        this.router = router;
        this._productService = _productService;
        this.pageTitle = 'Product Details';
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        // Simple concatination
        // this.pageTitle += this.currentRoute.snapshot.params["id"];
        var _this = this;
        // ES 2015 way
        var productId = this.currentRoute.snapshot.params['id'];
        this._productService.getProduct(productId)
            .subscribe(function (productResponse) { return _this.product = productResponse; }, function (error) { return _this.errorMessage = error; });
    };
    ProductDetailComponent.prototype.onBack = function () {
        this.router.navigate(['/products']);
    };
    return ProductDetailComponent;
}());
ProductDetailComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/product/product-detail.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, product_service_1.ProductService])
], ProductDetailComponent);
exports.ProductDetailComponent = ProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map