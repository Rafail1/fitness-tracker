import { NgModule } from "@angular/core";
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { FiredatePipe } from '../firedate.pipe';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';
@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        StopTrainingComponent,
        PastTrainingsComponent,
        FiredatePipe
    ],
    imports:[
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
    ],
    exports: [],
    entryComponents:[StopTrainingComponent]
})
export class TrainingModule {}