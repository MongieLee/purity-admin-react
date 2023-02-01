import {CLEAR_STORE_MENUS, SET_MENUS, SET_PERMISSIONS} from "@/store/const/menuConst";

export const setMenus = (menus: Array<any>) => ({type: SET_MENUS, payload: menus});
export const clearStoreMenus = () => ({type: CLEAR_STORE_MENUS});
export const setPermissions = (permissions: Array<string>) => ({type: SET_PERMISSIONS, payload: permissions});
