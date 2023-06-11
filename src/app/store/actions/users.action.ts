import { Action } from '@ngrx/store';
import { User } from 'src/app/models/User.model';

export const ActionTypes = {
    UPDATE_USERS_DATA: "UPDATE_USERS_DATA"
  }

export class UpdateUserAction implements Action {
  readonly type = ActionTypes.UPDATE_USERS_DATA;

  //add an optional payload

  constructor(public payload: User[]) {}
}

export type UserAction = UpdateUserAction;