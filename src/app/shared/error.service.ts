import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  constructor(private router: Router) { }

  redirectToErrorPage(error: any) {
    if (!environment.production) {
      console.log(error);
    }
    this.router.navigate(['/error']);
  }
}
