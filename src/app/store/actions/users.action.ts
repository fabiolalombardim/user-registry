import { Action } from '@ngrx/store';
import { User } from 'src/app/models/User.model';

export const ActionTypes = {
    UPDATE_USERS_DATA: "UPDATE_USERS_DATA",
    UPDATE_CITY_FILTERS: "UPDATE_CITY_FILTERS",
    UPDATE_COMPANY_NAME_FILTER: "UPDATE_COMPANY_NAME_FILTER"
  }

export class UpdateUserAction implements Action {
  readonly type = ActionTypes.UPDATE_USERS_DATA;

  //add an optional payload

  constructor(public payload: User[]) {}
}

export class UpdateCityFilters implements Action {
  readonly type = ActionTypes.UPDATE_CITY_FILTERS;

  //add an optional payload

  constructor(public payload: Set<string>) {}
}

export class UpdateCompanyNameFilter implements Action {
  readonly type = ActionTypes.UPDATE_COMPANY_NAME_FILTER;

  //add an optional payload

  constructor(public payload: Set<string>) {}
}

export type UserAction = UpdateUserAction | UpdateCityFilters | UpdateCompanyNameFilter