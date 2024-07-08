import axios, { AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearAccessTokenFromLs, getAccessTokenFromLs, setAccessTokenToLs, setProfileToLs } from './auth'
import path from 'src/constants/path'
import config from 'src/constants/config'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLs()
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setAccessTokenToLs(this.accessToken)
          setProfileToLs(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearAccessTokenFromLs()
        }
        return response
      },
      function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        if (error.respone?.status === HttpStatusCode.Unauthorized) {
          clearAccessTokenFromLs()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
