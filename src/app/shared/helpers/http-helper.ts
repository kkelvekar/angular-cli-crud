import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class HttpHelper {

    get jsonRequestOptions(): RequestOptions {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return options;
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
