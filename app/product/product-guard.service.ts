import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'

@Injectable()
export class ProductDetailGuard implements CanActivate
{
    constructor(private router: Router) { }
    canActivate(currentRoute: ActivatedRouteSnapshot): boolean
    {
        let productId = +currentRoute.url[1].path; // Here + sign used to convert string to numeric
        if (isNaN(productId) || productId < 0)
        {
            alert("Invalid route");
            this.router.navigate(['/products']);
            return false;
        }
        return true;
    }

}