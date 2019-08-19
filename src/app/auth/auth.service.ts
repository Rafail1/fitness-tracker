import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as formRoot from '../app.reducer';
import * as UI from '../shared/ui.action';
import * as Auth from './auth.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
              private auth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<formRoot.State>) {}

    initAuthListener() {
      this.auth.authState.subscribe(user => {
        if (user) {
          this.store.dispatch(new Auth.SetAuthenticated());
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscriptions();
          this.store.dispatch(new Auth.SetUnauthenticated());
          this.router.navigate(['/login']);
        }
      });
    }
    registerUser( authData: AuthData ) {
      this.store.dispatch(new UI.StartLoading());
      this.auth.auth.createUserWithEmailAndPassword(authData.email,
      authData.password).then(result => {
        this.store.dispatch(new UI.StopLoading());
      }).catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message);
      });
    }

    login( authData: AuthData ) {
      this.store.dispatch(new UI.StartLoading());
      this.auth.auth.signInWithEmailAndPassword(authData.email,
        authData.password).then(result => {
        this.store.dispatch(new UI.StopLoading());
        }).catch(error => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackbar(error.message);

        });
    }

    logout() {
      this.auth.auth.signOut();
    }
}
