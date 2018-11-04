import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class HttpService {

  constructor(public http: Http) { }

  getData(path, params = null): Observable<Response> {
    return this.http
      .get(path, params)
      .pipe(
        map(this.extractResponse),
        catchError(this.handleError)
      );
  }

  postData(path, payload, options = null): Observable<Response> {
    return this.http
      .post(path, payload, options)
      .pipe(
        map(this.extractResponse),
        catchError(this.handleError)
      );
  }

  putData(path, payload, options = null): Observable<Response> {
    return this.http
      .put(path, payload, options)
      .pipe(
        map(this.extractResponse),
        catchError(this.handleError)
      );
  }

  deleteData(path): Observable<Response> {
    return this.http
      .delete(path)
      .pipe(
        map(this.extractResponse),
        catchError(this.handleError)
      );
  }

  patchData(path, payload, params = null): Observable<Response> {
    return this.http
      .patch(path, payload)
      .pipe(
        map(this.extractResponse),
        catchError(this.handleError)
      );
  }

  extractResponse(res: Response) {
    return res.json();
  }

  handleError(error: Response | any) {
    const parsedMessage = !!error._body && typeof error._body === 'string' ?
      JSON.parse(error['_body'])['message'] : !!error.statusText ? error.statusText : 'Unknown error :(';
    return throwError({...error, message: (parsedMessage || null) });
  }
}
