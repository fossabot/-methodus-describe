import { Injectable, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  constructor(public jwtHelper: JwtHelperService) {

  }
  @Output()
  public group;

  public groupChanges: Function[] = [];

  @Output()
  public user: any;

  public setUser(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  public loadPermissions() {
    return {};
  }

  private isDelegated(user: any) {
    if (user.delegated && user.delegatedUntil && user.delegatedUntil.value) {
      const untilDate = new Date(user.delegatedUntil.value);
      const now = new Date();
      if (untilDate > now) {
        return true;
      }
    }
    return false;
  }


  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    const isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  public getUser() {
    const str = sessionStorage.getItem('user');
    if (str) {
      return JSON.parse(str);
    }
    return null;
  }
}
