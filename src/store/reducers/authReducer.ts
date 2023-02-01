import {REMOVE, UPDATE} from "@/store/const/userConst";
import {UserActionType} from "@/store/actions/userAction";
import {authInfoResponse} from "@/service/auth/auth";

export type StateUser = authInfoResponse | null

const initializationValue: { userInfo: StateUser } = {
  userInfo: null
};

export default (state = initializationValue, action: UserActionType) => {
  switch (action.type) {
    case UPDATE:
      return {userInfo: action.payload};
    case REMOVE:
      return {userInfo: null};
    default:
      return state;
  }
};
