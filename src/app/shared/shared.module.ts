import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
    declarations:[],
    imports:[],
    exports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
    ]
})
export class SharedModule {

}