import {deleteRequest, getRequest, postRequest, putRequest} from '../../utils/request';

export type PermissionMenu = {
  children: Array<PermissionMenu>,
  compName: string,
  icon?: string,
  id: number,
  isLnk: boolean,
  name: string,
  menuType: string,
  path: string,
  parentName?: string,
  parentId?: number,
  permission?: string[],
  remark?: string,
  sequence: number,
  state: boolean,
  visible: boolean,
  createdAt: string
}

export interface SysMenuItem {
  id?: number,
  name?: string,
  parentId?: number,
  path?: string,
  menuType?: "C" | "M" | "F",
  sequence?: number,
  visible?: boolean,
  compName?: string,
  permission?: string,
  isLink?: boolean,
  state?: boolean,
  createdBy?: string,
  createdAt?: string,
  updatedBy?: string,
  updatedAt?: string
}

class MenuService {
  /**
   * 根据Id获取菜单
   * @param id
   */
  static getMenuById(id: number) {
    return getRequest(`api/v1/menu/getUserMenus/${id}`);
  }

  /**
   * 获取全部菜单树
   */
  static getMenuTree() {
    return getRequest('api/v1/menu/tree');
  }

  /**
   * 获取当前用户自身菜单
   */
  static getMenuTreeOfSelf() {
    return getRequest<PermissionMenu[]>('api/v1/menu/getUserMenus');
  }

  /**
   * 创建菜单
   * @param data
   */
  static createMenu(data: Record<string, any>) {
    return postRequest(`api/v1/menu`, data);
  }

  /**
   * 更新菜单
   * @param id
   * @param data
   */
  static updateMenu( data: Record<string, any>) {
    return putRequest(`api/v1/menu`, data);
  }

  /**
   * 删除菜单
   * @param id
   */
  static deleteMenu(id: number) {
    return deleteRequest(`api/v1/menu/${id}`);
  }
}

export default MenuService;
