import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { APIService } from '../api/api.service';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY, TOKEN_EXPIRED } from '../../constants';
import { invalid } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private api: APIService
    ) {}

  get token() {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY) || null;
  }

  get user() {
    return this.isAuthenticated() ? JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)) : null;
  }

  public signup(userPayload) {
    const url = `/auth/registration/`;
    return this.api.postData(url, userPayload, {
        headers: {
          'Content-Type': 'application/json'
        },
      },
    );
  }

  public login({ username, password }) {
    const url = `/auth/login/`;
    return this.api.postData(url, { username, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
      },
    );
  }

  public logout(): void {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, TOKEN_EXPIRED);
  }

  public signInRequest() {
    return {
      'Authorization': `JWT ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  public saveToken(token) {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  public saveUser(user) {
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  public isAuthenticated(): boolean {
    return this.token ? !this.jwtHelper.isTokenExpired(this.token) : false;
  }

}
