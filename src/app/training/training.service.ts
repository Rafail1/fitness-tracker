import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.action';
import * as Training from './training.actions';
@Injectable()
export class TrainingService {
 
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchPastExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.fbSubs.push(
      this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        this.store.dispatch(new UI.StopLoading());
      }, error => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackbar(error.message);
      })
    );
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.fbSubs.push(
    this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          } as Exercise
        });
      })
    ).subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new UI.StopLoading())
      this.store.dispatch(new Training.SetAvailableTrainings(exercises));
    }, error => {
      this.store.dispatch(new UI.StopLoading())
      this.uiService.showSnackbar(error.message);
    }));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
    .then(console.log);
  }

  cancelExercise(process) {
    this.store.select(fromTraining.getCurrentExercise)
      .pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (process / 100),
        calories: ex.calories * (process / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());    
    })
  }

  completeExercise() {
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());    
    })
    
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));       
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(s => s.unsubscribe());
  }
}
