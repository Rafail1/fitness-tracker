import { Exercise } from './exercise.model';
import { Subject, Timestamp, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  availableExercises: Exercise[] =[]
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];
  constructor(private db: AngularFirestore) {
  }

  fetchPastExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises)
    }));
  }

  getRunningExercise() {
    return this.runningExercise;
  }
  fetchAvailableExercises() {
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
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises])
    }));
  }
  cancelSubscriptions() {
    this.fbSubs.forEach(s => s.unsubscribe());
  }
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
    .then(console.log);
  }
  cancelExercise(process) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (process / 100),
      calories: this.runningExercise.calories * (process / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  completeExercise() {
    this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  startExercise(selectedId: string) {
    this.db.doc('availableExercises/' + selectedId).update({
      lastSelected: new Date()
    });
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }
}
