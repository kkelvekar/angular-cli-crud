import { Component } from '@angular/core';
import { ProductService } from './product/product.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ProductService]
})
export class AppComponent { }
