import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://backendtodoapp.onrender.com',
    withCredentials:true,
})

export default axiosInstance