
   
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
  } from 'axios'
  
  export const HTTPTextClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,
  })

  export const HTTPNewsClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SECOND_URL as string,
  })
  
  HTTPTextClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return config
    },
    (error) => {
      console.error(error)
      return Promise.reject(error)
    }
  )
  
  HTTPTextClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      // TODO Prometheus or other bug tracking tool or redirects
      return Promise.reject(error)
    }
  )