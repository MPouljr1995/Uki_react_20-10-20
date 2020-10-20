import axios from "axios";

const API_URL = "http://localhost:8080/api/orders/";

class OderApi {
    getAllOders() {
        console.log("getAllOders....");
        return axios.get(API_URL);
    }

    addNewOder(oder) {
        return axios.post(API_URL,oder)
    }

}
export default new OderApi();