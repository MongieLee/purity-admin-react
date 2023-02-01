import {deleteRequest, getRequest, postRequest, putRequest} from '../../utils/request';

class RoleService {
  /**
   * 根据Id获取角色
   * @param id
   */
  static getRoleById(id) {
    return getRequest(`api/v1/role/${id}`, {id});
  }

  /**
   * 获取全部菜单树
   */
  static getAllRole() {
    return getRequest('api/v1/role/getAll');
  }

  static getRolesByPage(params) {
    return getRequest('api/v1/role/list', params);
  }

  /**
   * 创建角色
   * @param data
   */
  static createRole(data) {
    return postRequest(`api/v1/role`, data);
  }

  /**
   * 更新菜单
   * @param id
   * @param data
   */
  static updateRole(data) {
    return putRequest(`api/v1/role`, data);
  }

  /**
   * 删除菜单
   * @param id
   */
  static deleteRole(id) {
    return deleteRequest(`api/v1/role/${id}`);
  }
}

export default RoleService;
