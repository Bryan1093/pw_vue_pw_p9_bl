
import axios from 'axios';

const authClient = axios.create({
    baseURL: 'http://localhost:8082/auth',
    headers: {
        'Content-Type': 'application/json'
    }
});

const resourceClient = axios.create({
    baseURL: 'http://localhost:8081/matricula/api/v1.0',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

resourceClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

resourceClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');

            console.warn("Token invalido");
        }
        return Promise.reject(error);
    }
);

export default {
    async login(username, password, rol) {
        const response = await authClient.get('/token', {
            params: { user: username, password: password, rol: rol }
        });
        if (response.data && response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('user', username);
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
    },

    createVehiculo(vehiculo) {
        return resourceClient.post('/vehiculos', vehiculo);
    },

    getAllVehiculos() {
        return resourceClient.get('/vehiculos');
    }
};
