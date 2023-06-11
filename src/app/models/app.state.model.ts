import { DataState } from "../store/reducers/users.reducer";
import { User } from "./User.model";

export interface AppState {
    readonly dataState: DataState;
  }