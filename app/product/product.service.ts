import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IProduct } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'automapper-ts/dist/automapper';


@Injectable()
export class ProductService {
    private productUrl: string = 'http://kkcrudapi.azurewebsites.net/Product';

    constructor(private _http: Http) { }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this.productUrl + '/GetProducts')
            .map((response: Response) => this.mapResponseToProduct(response.json()))
            .do(data => console.log(JSON.stringify(data))) // Optional (Called after response)
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.productId === id));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private mapResponseToProduct(response: Response): IProduct[] {
        automapper
            .createMap('response', 'product')
            .forMember('productName', function (opts: any) { opts.mapFrom('Name'); })
            .forMember('productCode', function (opts: any) { opts.mapFrom('Code'); })
            .forMember('price', function (opts: any) { opts.mapFrom('Price'); })
            .forMember('releaseDate', function (opts: any) { opts.mapFrom('ReleaseDate'); })
            .forMember('starRating', function (opts: any) { opts.mapFrom('StarRating'); })
            .forMember('imageUrl', function (opts: any) { opts.mapFrom('ImageUrl'); });
        return automapper.map('response', 'product', response);
    }
}