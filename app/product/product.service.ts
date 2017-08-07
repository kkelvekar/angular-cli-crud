import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'automapper-ts/dist/automapper';

import { IProduct } from './product';
import { HttpHelper } from '../shared/http-helper';


@Injectable()
export class ProductService {
    private productUrl: string = 'http://kkcrudapi.azurewebsites.net/Product';

    constructor(private http: Http, private httpHelper: HttpHelper) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get(this.productUrl + '/GetProducts')
            .map((response: Response) => this.mapResponseToProduct(response.json()))
            // .do(data => console.log(JSON.stringify(data))) // Optional (Called after response)
            .catch(this.httpHelper.handleError);
    }

    getProduct(id: string): Observable<IProduct> {
        return this.http.get(`${this.productUrl}/GetProduct?Id=${id}`)
            .map((response: Response) => this.mapResponseToProduct(response.json()))
            // .do(data => console.log(JSON.stringify(data))) // Optional (Called after response)
            .catch(this.httpHelper.handleError);
    }

    addProduct(product: IProduct): Observable<any> {
        let productRequest = JSON.stringify(this.mapProductToResponse(product));
        return this.http.post(`${this.productUrl}/PostProduct`, productRequest, this.httpHelper.jsonRequestOptions);
    }

    updateProduct(product: IProduct): Observable<any> {
        let productRequest = this.mapProductToResponse(product);
        return this.http.put(`${this.productUrl}/PutProduct`, JSON.stringify(productRequest), this.httpHelper.jsonRequestOptions);
    }

    // To do - need to move in separate class
    private mapResponseToProduct(response: Response): IProduct[] {
        automapper
            .createMap('response', 'product')
            .forMember('productId', function (opts: any) { opts.mapFrom('id'); })
            .forMember('productName', function (opts: any) { opts.mapFrom('name'); })
            .forMember('productCode', function (opts: any) { opts.mapFrom('code'); });
        return automapper.map('response', 'product', response) || [];
    }

    // To do - need to move in separate class
    private mapProductToResponse(product: IProduct): any {
        automapper
            .createMap('product', 'response')
            .forMember('Id', function (opts: any) { opts.mapFrom('productId'); })
            .forMember('Name', function (opts: any) { opts.mapFrom('productName'); })
            .forMember('code', function (opts: any) { opts.mapFrom('productCode'); });
        return automapper.map('product', 'response', product);
    }
}