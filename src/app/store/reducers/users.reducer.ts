// // import the interface
import { User } from 'src/app/models/User.model';
import * as Users from '../actions/users.action';

export interface DataState {
  users: User[] 
  cityFilter: Set<string>,
  companyNameFilter:  Set<string>
}

const initialState = {
  users: [],
  cityFilter: new Set(""),
  companyNameFilter: new Set("")
}


export function reducer(
    state = initialState,
    action: Users.UserAction
  ): DataState {
    switch (action.type) {

      case Users.ActionTypes.UPDATE_USERS_DATA: {
       
        return  {...state, users: action.payload as User[]} 
      }

      case Users.ActionTypes.UPDATE_CITY_FILTERS: {
        return  {...state, cityFilter: action.payload as Set<string>} 
      }

      case Users.ActionTypes.UPDATE_COMPANY_NAME_FILTER: {
        return  {...state, companyNameFilter: action.payload as Set<string>} 
      }
   
      default: {
        return state;
      }
    }
  }

