import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';

import { IProduct } from './product';
import { HttpHelper } from '../shared/helpers/http-helper';
import { ProductMapping } from './product-mapping';
import { environment } from 'environments/environment';


@Injectable()
export class ProductService {
  private productUrl = environment.productUrl;

  constructor(private http: Http, private httpHelper: HttpHelper, private productMapping: ProductMapping) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get(this.productUrl + '/GetProducts')
      .map((response: Response) => this.productMapping.mapResponseToProduct(response.json()));
    // .do(data => console.log(JSON.stringify(data))) // Optional (Called after response)
    // .catch(this.httpHelper.handleError);
  }

  getProduct(id: string): Observable<IProduct> {
    return this.http.get(`${this.productUrl}/GetProduct?Id=${id}`)
      .map((response: Response) => this.productMapping.mapResponseToProduct(response.json()));
    // .do(data => console.log(JSON.stringify(data))) // Optional (Called after response)
    // .catch(this.httpHelper.handleError);
  }

  addProduct(product: IProduct): Observable<any> {
    const productRequest = JSON.stringify(this.productMapping.mapProductToResponse(product));
    return this.http.post(`${this.productUrl}/PostProduct`, productRequest, this.httpHelper.jsonRequestOptions);
  }

  updateProduct(product: IProduct): Observable<any> {
    const productRequest = this.productMapping.mapProductToResponse(product);
    return this.http.put(`${this.productUrl}/PutProduct`, JSON.stringify(productRequest), this.httpHelper.jsonRequestOptions);
  }

  deleteProduct(Id: string): Observable<any> {
    return this.http.delete(`${this.productUrl}/DeleteProduct?Id=${Id}`);
    // .catch(this.httpHelper.handleError);
  }


}
