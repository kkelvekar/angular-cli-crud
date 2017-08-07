import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class ProductGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(currentRoute: ActivatedRouteSnapshot): boolean {

        let productId = currentRoute.url[1].path;
        let guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!guidPattern.test(productId)) {
            alert('Invalid route');
            this.router.navigate(['/products']);
            return false;
        }
        return true;
    }

}