import {deleteRequest, getRequest, postRequest, putRequest} from '@/utils/request';

const basePre = `api/v1/departments`;

class DepartmentService {
  /**
   * 根据Id获取部门
   * @param id
   */
  static getDepartmentById(id: number) {
    return getRequest(`${basePre}/${id}`, {id});
  }

  /**
   * 获取全部部门树
   */
  static getDepartmentTree() {
    return getRequest(basePre + `/tree`);
  }

  /**
   * 创建部门
   * @param data
   */
  static createDepartment(data: Record<string, any>) {
    return postRequest(basePre, data);
  }

  /**
   * 更新部门
   * @param data
   */
  static updateDepartment(data: Record<string, any>) {
    return putRequest(basePre, data);
  }

  /**
   * 删除部门
   * @param id
   */
  static deleteDepartment(id: number) {
    return deleteRequest(`${basePre}/${id}`);
  }
}

export default DepartmentService;
