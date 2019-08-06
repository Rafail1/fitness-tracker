import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
   this.startOrResumeTraining();
  }
  isDone() {
    if (this.progress >= 100) {
      this.trainingService.completeExercise();
      return true;
    }
    return false;
  }
  resetTimer() {
    return this.progress = 0;
  }
  startOrResumeTraining() {
    if (this.isDone()) {
      this.resetTimer();
    }
    const duration = this.trainingService.getRunningExercise().duration;
    const step = duration * 10;
    this.timer = setInterval(() => {
      if (this.isDone()) {
        return clearInterval(this.timer);
      }
      this.progress += 1;
    }, step);
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
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }

}
