import axios from 'axios'
import message from "@/utils/message"

// create an axios instance
const service = axios.create({
    timeout: 60000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const { data } = response
        if (!data.success) {
            message({ type: "error", text: data.message })
        }
        return data
    },
    error => {
        const { response } = error
        if (response?.config) {
            message({ type: "error", text: response.data.message })
            return Promise.resolve(response.data)
        }
        return Promise.resolve(response.data)
    }
)


export default service
