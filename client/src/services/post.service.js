import http from "../http-common";

class PostDataService {
    getAll(itemsPerPage, itemOffset) {
        return http.get(`/posts?limit=${itemsPerPage}&offset=${itemOffset}`);
    }
    edit(id) {
        return http.get(`/edit-post/${id}`);
    }
    create(data) {
        return http.post("/add-post", data);
    }
    update(id, data) {
        return http.put(`/update-post/${id}`, data);
    }
    delete(id) {
        return http.delete(`/delete-post/${id}`);
    }
}

export default new PostDataService();