import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loading$: Subscription;
  constructor(private authService: AuthService, 
    private fb: FormBuilder,
    private uiService: UIService) { }

  ngOnInit() {
    this.loading$ = this.uiService.loadingStateChanged.subscribe(isLoading => {this.isLoading = isLoading})
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy() {
    if(this.loading$) {
      this.loading$.unsubscribe();
    }
  }
  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
