import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable({
    providedIn:'root'
})
export class UIService {
    constructor(private matSnackbar: MatSnackBar) {}

    showSnackbar(message:string, action = null, duration = 3000) {
        this.matSnackbar.open(message, action, {duration});
    }
}