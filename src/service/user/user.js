import {deleteRequest, getRequest, postRequest, putRequest} from '../../utils/request';

class UserService {
  /**
   * 登录用户列表
   * @param params 分页参数+所属部门+名字模糊查询
   */
  static getList(params) {
    return getRequest('api/v1/users', params);
  }


  /**
   * 更新用户
   * @param data
   */
  static update(data) {
    return putRequest('api/v1/users', data)
  }

  /**
   * 新建用户
   * @param data
   */
  static create(data) {
    return postRequest('api/v1/users', data)
  }

  /**
   * 删除用户
   * @param id
   */
  static delete(id) {
    return deleteRequest(`api/v1/users/${id}`);
  }
}

export default UserService;
