import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';


@NgModule({
  exports: [
    MatButtonModule, MatIconModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatSidenavModule, MatToolbarModule,
    MatListModule, MatTabsModule, MatCardModule,
    MatSelectModule, MatProgressSpinnerModule, MatDialogModule
  ]
})
export class MaterialModule {}
