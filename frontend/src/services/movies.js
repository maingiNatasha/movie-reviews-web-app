import axios from "axios";

class MovieDataService {
    constructor() {
        this.api_url = "https://moviereviewsmern-lxb4nke5.b4a.run/api/v1/movies";
    }

    getAll(page = 0) {
        return axios.get(`${this.api_url}?page=${page}`);
    }

    get(id) {
        return axios.get(`${this.api_url}/id/${id}`);
    }

    find(query, by = "title", page = 0) {
        return axios.get(`${this.api_url}?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return axios.post(`${this.api_url}/review`, data);
    }

    updateReview(data) {
        return axios.put(`${this.api_url}/review`, data);
    }

    deleteReview(id, userId) {
        return axios.delete(`${this.api_url}/review/`, {data: {review_id:id, user_id: userId}});
    }

    getRatings() {
        return axios.get(`${this.api_url}/ratings`);
    }
};

const movieDataService = new MovieDataService();
export default movieDataService;