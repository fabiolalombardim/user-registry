import { User } from "./User.model";

export interface AppState {
    readonly users: Array<User>;
  }