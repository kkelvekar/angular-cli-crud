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
var ProductGuard = (function () {
    function ProductGuard(router) {
        this.router = router;
    }
    ProductGuard.prototype.canActivate = function (currentRoute) {
        var productId = currentRoute.url[1].path;
        var guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!guidPattern.test(productId)) {
            alert('Invalid route');
            this.router.navigate(['/products']);
            return false;
        }
        return true;
    };
    return ProductGuard;
}());
ProductGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], ProductGuard);
exports.ProductGuard = ProductGuard;
//# sourceMappingURL=product-guard.service.js.map