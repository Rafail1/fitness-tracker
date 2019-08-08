import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthentificated: boolean;
  constructor(private router: Router,
              private auth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UIService) {}

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
      this.uiService.loadingStateChanged.next(true);

     this.auth.auth.createUserWithEmailAndPassword(authData.email,
      authData.password).then(result => {
        this.uiService.loadingStateChanged.next(false);

      }).catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message);
      });
    }

    login( authData: AuthData ) {
      this.uiService.loadingStateChanged.next(true);
      this.auth.auth.signInWithEmailAndPassword(authData.email,
        authData.password).then(result => {
          this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar(error.message);

        });
    }

    logout() {
      this.auth.auth.signOut();
    }

    isAuth() {
      return this.isAuthentificated;
    }
}
