import { DataState } from "../store/reducers/users.reducer";

// NGRX Store interface type
export interface AppState {
    readonly dataState: DataState;
  }