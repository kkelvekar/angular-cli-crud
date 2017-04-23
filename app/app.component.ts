import { Component } from '@angular/core';
import { ProductService } from "./product/product.service"

@Component({
    selector: 'pm-app',
    template: '<h1>Angular2: Getting Started</h1><pm-products></pm-products>',
    providers: [ProductService]
})
export class AppComponent { }
