import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JWTService {
  get jwt(): string {
    return localStorage.getItem(environment.jwtKey) || '';
  }

  set jwt(accessToken: string) {
    localStorage.setItem(environment.jwtKey, accessToken);
  }

  get isStoredJwt(): boolean {
    return Boolean(this.jwt);
  }
}
