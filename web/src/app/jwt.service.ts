import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JWTService implements HttpInterceptor {
  get jwt(): string {
    return localStorage.getItem(environment.jwtKey) || '';
  }

  set jwt(accessToken: string) {
    localStorage.setItem(environment.jwtKey, accessToken);
  }

  get isStoredJwt(): boolean {
    return Boolean(this.jwt);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith(environment.apiUrl)) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.jwt}` },
      });
    }

    return next.handle(request);
  }
}
