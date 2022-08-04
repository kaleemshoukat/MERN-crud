import http from "../http-common";

class AuthDataService {
    login(data) {
        return http.post(`/login`, data);
    }
    loginSocial(data) {
        return http.post(`/login-social`, data);
    }
    logout() {
        return http.get(`/logout`);
    }
    storeToken(data) {
        return http.post(`/store-token`, data);
    }
}

export default new AuthDataService();