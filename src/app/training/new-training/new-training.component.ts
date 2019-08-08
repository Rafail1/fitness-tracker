import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = false;
  private loading$: Subscription;
  exerciseSubscription: Subscription;
  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
    ) { }

  ngOnInit() {
    this.loading$ = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises)
    this.fetchExercises();
  }

  ngOnDestroy() {
    if(this.loading$) {
      this.loading$.unsubscribe();
    }
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    console.log(form);
    this.trainingService.startExercise(form.value.exercise);
  }
}
