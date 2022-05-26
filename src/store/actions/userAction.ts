import {REMOVE, UPDATE} from "@/store/const/userConst";

export const updateUser = (user: object) => ({type: UPDATE, payload: user});
export const remove = () => ({type: REMOVE});

type updateType = Action<object>
type removeTYpe = Action<null>

export type UserActionType = updateType | removeTYpe