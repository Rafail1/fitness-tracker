import { NgModule } from "@angular/core";

import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
    declarations:[ 
        SingupComponent,
        LoginComponent,
    ],
    imports:[
        SharedModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AuthRoutingModule
    ],
    exports:[]
})
export class AuthModule {

}