import { User } from "src/app/models/User.model"

function updateUsersData(data: User[]) {
    return <const>{
      type: ActionTypes.UPDATE_USERS_DATA,
      data
    }
  }
  
  export type DeploymentAction = ReturnType<
    | typeof updateUsersData
  >
  
  export enum ActionTypes {
    UPDATE_USERS_DATA = "UPDATE_USERS_DATA"
  }