import {deleteRequest, getRequest, postRequest, putRequest} from '@/utils/request';

const basePre = `api/v1/departments`;

export interface DepartmentItem  {
  checked?:boolean,
  children?: DepartmentItem[],
  createdAt?: string,
  createdBy?: string,
  id?: number,
  name?: string,
  parentId?: number,
  parentName?: string,
  phoneNumber?: string,
  principal?: string,
  sequence?: number,
  state?: boolean,
  updatedAt?: string,
  updateBy?: string
}

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
    return getRequest<DepartmentItem[]>(basePre + `/tree`);
  }

  /**
   * 创建部门
   * @param data
   */
  static createDepartment(data: DepartmentItem) {
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
