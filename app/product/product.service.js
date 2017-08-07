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
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("automapper-ts/dist/automapper");
var http_helper_1 = require("../shared/http-helper");
var ProductService = (function () {
    function ProductService(http, httpHelper) {
        this.http = http;
        this.httpHelper = httpHelper;
        this.productUrl = 'http://kkcrudapi.azurewebsites.net/Product';
    }
    ProductService.prototype.getProducts = function () {
        var _this = this;
        return this.http.get(this.productUrl + '/GetProducts')
            .map(function (response) { return _this.mapResponseToProduct(response.json()); })
            .catch(this.httpHelper.handleError);
    };
    ProductService.prototype.getProduct = function (id) {
        var _this = this;
        return this.http.get(this.productUrl + "/GetProduct?Id=" + id)
            .map(function (response) { return _this.mapResponseToProduct(response.json()); })
            .catch(this.httpHelper.handleError);
    };
    ProductService.prototype.addProduct = function (product) {
        var productRequest = JSON.stringify(this.mapProductToResponse(product));
        return this.http.post(this.productUrl + "/PostProduct", productRequest, this.httpHelper.jsonRequestOptions);
    };
    ProductService.prototype.updateProduct = function (product) {
        var productRequest = this.mapProductToResponse(product);
        return this.http.put(this.productUrl + "/PutProduct", JSON.stringify(productRequest), this.httpHelper.jsonRequestOptions);
    };
    // To do - need to move in separate class
    ProductService.prototype.mapResponseToProduct = function (response) {
        automapper
            .createMap('response', 'product')
            .forMember('productId', function (opts) { opts.mapFrom('id'); })
            .forMember('productName', function (opts) { opts.mapFrom('name'); })
            .forMember('productCode', function (opts) { opts.mapFrom('code'); });
        return automapper.map('response', 'product', response) || [];
    };
    // To do - need to move in separate class
    ProductService.prototype.mapProductToResponse = function (product) {
        automapper
            .createMap('product', 'response')
            .forMember('Id', function (opts) { opts.mapFrom('productId'); })
            .forMember('Name', function (opts) { opts.mapFrom('productName'); })
            .forMember('code', function (opts) { opts.mapFrom('productCode'); });
        return automapper.map('product', 'response', product);
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_helper_1.HttpHelper])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map