import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | string[]>;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private http = inject(HttpClient);

  postServiceCall<T>(
    url: string,
    body?: any,
    options: ApiOptions = {}
  ): Observable<T> {
    const httpOptions = this.makeHttpOptions(options);
    return this.http.post<T>(url, body, httpOptions);
  }

  private makeHttpOptions( options: ApiOptions = {}, params?: HttpParams): Record<string, any> {
    const headers = this.createHeaders(options.headers);
    const httpOptions: Record<string, any> = { headers };

    if ( params ) {
      httpOptions['params'] = params;
    }

    Object.keys(options).forEach((key) => {
      if (key !== 'headers' && key !== 'params' ) {
        httpOptions[key] = options[key];
      }
    });

    return httpOptions;
  }

  private createHeaders(headers?: Record<string, string>): HttpHeaders {
    let httpHeaders = new HttpHeaders();

    if ( headers ) {
      Object.keys(headers).forEach((key) => {
        httpHeaders = httpHeaders.set(key, headers[key]);
      });
    }

    return httpHeaders;
  }
}
