import {authInfoResponse} from "@/service/auth/auth";
import {CLEAR_STORE_MENUS, SET_MENUS, SET_PERMISSIONS} from "@/store/const/menuConst";
import {getToken} from "@/utils/token";
import {menuTypeEnum} from "@/router/config";

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

export function findBtnPermissions(menus: any) {
  const result: string[] = [];
  getBtn(menus, result);
  return result;
}

function getBtn(list: any[], result: any[]) {
  list.map(i => {
    if (i.menuType === menuTypeEnum.button) {
      result.push(i.permission);
    }
    if (i.children.length) {
      getBtn(i.children, result);
    }
  })
}
