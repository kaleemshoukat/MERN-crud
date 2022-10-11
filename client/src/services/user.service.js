import http from "../http-common";

class UserDataService {
    getAll(itemsPerPage, itemOffset) {
        return http.get(`/users/list?limit=${itemsPerPage}&offset=${itemOffset}`);
    }
    edit(id) {
        return http.get(`/users/edit/${id}`);
    }
    create(data) {
        return http.post("/users/add", data);
    }
    update(id, data) {
        return http.put(`/users/update/${id}`, data);
    }
    delete(id) {
        return http.delete(`/users/delete/${id}`);
    }
    chart() {
        return http.get(`/users/chart`);
    }
}

export default new UserDataService();