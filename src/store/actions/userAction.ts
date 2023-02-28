import {REMOVE, UPDATE} from "@/store/const/userConst";
import {Dispatch} from "redux";
import AuthService from "@/service/auth";

export const updateUser = () => {
  console.log('action running [updateUser] ')
  return async (dispatch: Dispatch) => {
    dispatch({type: UPDATE, payload: await AuthService.getUserInfo()});
  }
}
export const remove = () => ({type: REMOVE});

type updateType = Action<object>
type removeTYpe = Action<null>

export type UserActionType = updateType | removeTYpe
