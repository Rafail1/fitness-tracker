import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import { TrainingActions,
     SET_AVAILABLE_TRAININGS,
      START_TRAINING,
       SET_FINISHED_TRAININGS,
        STOP_TRAINING } from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
    availableExercises:Exercise[];
    finishedExercises: Exercise[];
    currentExercise: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    currentExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case START_TRAINING:
            return {
                ...state,
                currentExercise: state.availableExercises.find(ex => (ex.id === action.payload))
            };
        case STOP_TRAINING:
            return {
                ...state,
                currentExercise:null
            };
        default: return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState,  (state: TrainingState) => state.availableExercises);
export const getFininshedExercises = createSelector(getTrainingState,  (state: TrainingState) => state.finishedExercises);
export const getCurrentExercise = createSelector(getTrainingState,  (state: TrainingState) => state.currentExercise);
export const getIsTraining = createSelector(getTrainingState,  (state: TrainingState) => !!state.currentExercise);
