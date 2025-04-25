import axios from 'axios'
import Utils from "../utils/Utils";
import {store, alertActions} from "../utils/Rdx";

const API_URL = 'http://localhost:8080/api/v1'
const AUTH_URL = 'http://localhost:8080/auth'

const apiClient = axios.create();

function showError(msg) {
    store.dispatch(alertActions.error(msg))
}

apiClient.interceptors.request.use(
    config => {
        store.dispatch(alertActions.clear())
        let token = Utils.getToken();
        if (token)
            config.headers.Authorization = token;
        return config;
    },
    error => {
        showError(error.message)
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(undefined,
    error => {
        if (error.response && error.response.status && [401, 403].indexOf(error.response.status) !== -1)
            showError("Authorization error from interceptor")
        else if (error.response && error.response.data && error.response.data.message)
            showError(error.response.data.message)
        else
            showError(error.message)
        return Promise.reject(error);
    })


class BackendService {

    login(login, password) {
        return apiClient.post(`${AUTH_URL}/login`, {login, password})
    }

    logout() {
        return axios.get(`${AUTH_URL}/logout`, { headers : {Authorization : Utils.getToken()}})
    }

}

export default new BackendService()
