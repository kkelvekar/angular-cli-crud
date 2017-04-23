import { Injectable } from '@angular/core';
import { Http,Response } from "@angular/http";
import { IProduct } from "./product";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Injectable()
export class ProductService {
    private productUrl: string = "api/products/products.json"

    constructor(private _http: Http) { }

    getProduct(): Observable<IProduct[]> {
        return this._http.get(this.productUrl)
                         .map((response: Response) => <IProduct[]>response.json())
                         .do(data => console.log(JSON.stringify(data))) // Optional (Called after response)
                         .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json() || "Server error");
    }
}