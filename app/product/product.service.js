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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("automapper-ts/dist/automapper");
var ProductService = (function () {
    function ProductService(_http) {
        this._http = _http;
        this.productUrl = 'http://kkcrudapi.azurewebsites.net/Product';
    }
    ProductService.prototype.getProducts = function () {
        var _this = this;
        return this._http.get(this.productUrl + '/GetProducts')
            .map(function (response) { return _this.mapResponseToProduct(response.json()); })
            .do(function (data) { return console.log(JSON.stringify(data)); }) // Optional (Called after response)
            .catch(this.handleError);
    };
    ProductService.prototype.getProduct = function (id) {
        return this.getProducts()
            .map(function (products) { return products.find(function (p) { return p.productId === id; }); });
    };
    ProductService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json() || 'Server error');
    };
    ProductService.prototype.mapResponseToProduct = function (response) {
        automapper
            .createMap('response', 'product')
            .forMember('productName', function (opts) { opts.mapFrom('Name'); })
            .forMember('productCode', function (opts) { opts.mapFrom('Code'); })
            .forMember('price', function (opts) { opts.mapFrom('Price'); })
            .forMember('releaseDate', function (opts) { opts.mapFrom('ReleaseDate'); })
            .forMember('starRating', function (opts) { opts.mapFrom('StarRating'); })
            .forMember('imageUrl', function (opts) { opts.mapFrom('ImageUrl'); });
        return automapper.map('response', 'product', response);
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map