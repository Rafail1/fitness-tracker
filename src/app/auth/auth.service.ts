import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  authChange = new Subject<boolean>();
    private user: User;

    registerUser( authData: AuthData ) {
      this.user = {
        email: authData.email,
        userId: Math.round(Math.random() * 10000).toString()
      };
    }

    login( authData: AuthData ) {
      this.user = {
        email: authData.email,
        userId: Math.round(Math.random() * 10000).toString()
      };
      this.authSuccessfully();
    }
    authSuccessfully() {
      this.authChange.next(true);
      this.router.navigate(['/training']);
    }
    logout() {
      this.user = null;
      this.authChange.next(false);
      this.router.navigate(['/login']);
    }

    getUser() {
      return { ...this.user };
    }

    isAuth() {
      return this.user != null;
    }
}
