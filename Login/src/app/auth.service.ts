import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  helper = new JwtHelperService();
  decodeToken(token: string): any {
    try {
      return this.helper.decodeToken(token);
    } catch (Error) {
      return null;
    }
  }
}
