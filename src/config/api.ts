
import axios, {type AxiosInstance} from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

nprogress.configure({
    showSpinner: true,
    speed: 400,
    minimum: 0.1
})

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        nprogress.start()
        return config
    }, (error) => {
        nprogress.done()
        Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        nprogress.done()
        return response
    }, (error) => {
        nprogress.done()
        return Promise.reject(error)
    }
)

export default api