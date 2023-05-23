import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8084",
});

export default instance;
