import request from "@/utils/request";

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

interface authResponse {
    refresh_token: string,
    token: string,
    expires: number;
}

class AuthService {
    static login(data: authFormData) {
        return request<authResponse>({
            method: "post",
            url: "/auth/login",
            data
        });
    }

    static register(data: authFormData) {
        return request<null>({
            method: "post",
            url: "/auth/register",
            data
        });
    }

    static refreshToken(data: refreshFormData) {
        return request<authResponse>({
            method: "post",
            url: "/auth/refreshToken",
            data
        });
    }
}

export default AuthService;