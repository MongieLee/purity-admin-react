import {REMOVE, UPDATE} from "@/store/const/userConst";
import {UserActionType} from "@/store/actions/userAction";
import {authInfoResponse} from "@/service/auth/auth";
import {CLEAR_STORE_MENUS, SET_MENUS, SET_PERMISSIONS} from "@/store/const/menuConst";
import {getToken} from "@/utils/token";

export type StateUser = authInfoResponse | null

const STORE_MENUS_KEY = "permission_menus";
const getInitMenus = () => {
  let result = [];
  try {
    result = JSON.parse(getToken(STORE_MENUS_KEY) || '')
  } catch {
    return result;
  }
  return result;
}

const initializationValue: { menus: Array<any>, permissions: Array<string> } = {
  menus: getInitMenus(),
  permissions: []
};

export default (state = initializationValue, action: any) => {
  switch (action.type) {
    case SET_MENUS:
      return {...state, menus: action.payload};
    case CLEAR_STORE_MENUS:
      return {...state, menus: []};
    case SET_PERMISSIONS:
      return {...state, permissions: action.payload};
    default:
      return state;
  }
};
