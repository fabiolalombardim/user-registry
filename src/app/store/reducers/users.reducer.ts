// // import the interface
import { User } from 'src/app/models/User.model';
import * as Users from '../actions/users.action';
import { createReducer } from '@ngrx/store';

// //create a dummy initial state

const test = {
    users: [
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
            }
        }
    ]
}

const initialState: User[] = []


export function reducer(
    state = initialState,
    action: Users.UserAction
  ): User[] {
    switch (action.type) {

      case Users.ActionTypes.UPDATE_USERS_DATA: {
        return  action.payload // typed to { home: number, away: number }
      }
   
      default: {
        return state;
      }
    }
  }

// export function UserReducer(
//     state: State = initialState,
//     action: UserAction
// ): State {
//     switch (action.type) {
//         case ActionTypes.UPDATE_USERS_DATA:
//             return { ...state, users: action.payload }
//         default: {
//             return {...state}
//         }
//     }
// }
