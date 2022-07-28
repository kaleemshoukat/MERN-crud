import http from "../http-common";

class AuthDataService {
    loginSocial() {
        return http.post(`/login-social`);
    }
}

export default new AuthDataService();