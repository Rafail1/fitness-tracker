import { AuthActions, SET_ATUHENTICATED, SET_UNATHENTICATED } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_ATUHENTICATED: return {isAuthenticated: true};
    case SET_UNATHENTICATED: return {isAuthenticated: false};
    default: return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
