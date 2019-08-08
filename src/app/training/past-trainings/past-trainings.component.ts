import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  private exChanged$: Subscription;
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private trainingService: TrainingService,
     private db: AngularFirestore) { }

  ngOnInit() {
    this.exChanged$ = this.trainingService.finishedExercisesChanged
    .subscribe((exercises:Exercise[]) => {
      this.dataSource.data = exercises;
    })
    this.trainingService.fetchPastExercises();
  }

  ngOnDestroy() {
    if(this.exChanged$) {
      this.exChanged$.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
