import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthentificated: boolean;
  constructor(private router: Router,
              private auth: AngularFireAuth,
              private trainingService: TrainingService) {}

    initAuthListener() {
      this.auth.authState.subscribe(user => {
        if (user) {
          this.isAuthentificated = true;
          this.authChange.next(true);
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscriptions();
          this.isAuthentificated = false;
          this.authChange.next(false);
          this.router.navigate(['/login']);
        }
      });
    }
    registerUser( authData: AuthData ) {
     this.auth.auth.createUserWithEmailAndPassword(authData.email,
      authData.password).then(result => {

      }).catch(error => {
        console.log(error);
      });
    }

    login( authData: AuthData ) {
      this.auth.auth.signInWithEmailAndPassword(authData.email,
        authData.password).then(result => {

        }).catch(err => {
          console.error(err);
        });
    }

    logout() {
      this.auth.auth.signOut();
    }

    isAuth() {
      return this.isAuthentificated;
    }
}
