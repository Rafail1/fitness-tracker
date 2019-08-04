import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: any;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
   this.startOrResumeTraining();
  }
  isDone() {
    return this.progress >= 100;
  }
  resetTimer() {
    return this.progress = 0;
  }
  startOrResumeTraining() {
    if (this.isDone()) {
      this.resetTimer();
    }
    this.timer = setInterval(() => {
      if (this.isDone()) {
        return clearInterval(this.timer);
      }
      this.progress += 5;
    }, 500);
  }
  stopTraining() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTraining();
      }
    });
  }

}
