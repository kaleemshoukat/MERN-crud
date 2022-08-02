import http from "../http-common";

class AuthDataService {
    login(data) {
        return http.post(`/login`, data);
    }
    loginSocial(data) {
        return http.post(`/login-social`, data);
    }
}

export default new AuthDataService();