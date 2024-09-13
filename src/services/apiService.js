import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import router from '@/router';


const apiService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

apiService.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response && error.response.status === 401) {
            console.log('401 !!!!!!!!!!!!!!!');
            const userStore = useUserStore();
            userStore.clearUser();
            router.push('/auth');
        }
        return Promise.reject(error.response.data);
    }
);

export default apiService;
