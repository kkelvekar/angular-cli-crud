import { Component } from '@angular/core';
import { ProductService } from "./product/product.service"

@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html',
    providers: [ProductService]
})
export class AppComponent { }
