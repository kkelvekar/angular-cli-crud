import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { IProduct } from './product';
import 'automapper-ts/dist/automapper';

@Injectable()
export class ProductMapping {

  public mapResponseToProduct(response: Response): any {
    automapper
      .createMap('response', 'product')
      .forMember('productId', function (opts: any) { opts.mapFrom('id'); })
      .forMember('productName', function (opts: any) { opts.mapFrom('name'); })
      .forMember('productCode', function (opts: any) { opts.mapFrom('code'); });
    return automapper.map('response', 'product', response) || [];
  }

  public mapProductToResponse(product: IProduct): any {
    automapper
      .createMap('product', 'response')
      .forMember('Id', function (opts: any) { opts.mapFrom('productId'); })
      .forMember('Name', function (opts: any) { opts.mapFrom('productName'); })
      .forMember('code', function (opts: any) { opts.mapFrom('productCode'); });
    return automapper.map('product', 'response', product);
  }
}
