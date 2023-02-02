import request, {getRequest, putRequest} from "@/utils/request";
import {PasswordState} from "@/pages/system/changePassword/changePassword";

type TokenGrantType = "access_token" | "access_token"

export interface authFormData {
  username: string;
  password: string;
  tokenGrantType?: TokenGrantType;
}

interface refreshFormData {
  refreshToken: string;
  tokenGrantType: TokenGrantType;
}

export interface authResponse {
  refresh_token: string,
  token: string,
  expires: number;
}

export interface authInfoResponse {
  avatar: string,
  deptId: number,
  id: number,
  username: string,
  nickname: string,
  status: boolean,
  updatedAt: string,
  createdAt: string
}

class AuthService {
  /**
   * 登录获取登录凭证
   * @param data
   */
  static login(data: authFormData) {
    return request<authResponse>({
      method: "post",
      url: "api/v1/auth/login",
      data
    });
  }

  /**
   * 获取当前登录用户信息
   */
  static getUserInfo() {
    return getRequest<authInfoResponse>("api/v1/users/info");
  }

  /**
   * 更新用户密码
   */
  static changePassword(data: PasswordState) {
    return putRequest('api/v1/users/updatePassword', data);
  }
}

export default AuthService;
