import axios from 'axios'

const isRefreshingToken = false
const requestsPending = []

const createAxios = (baseURL) => {
  const newInstance = axios.create({ baseURL })
  const runtimeConfig = useRuntimeConfig()
  newInstance.interceptors.request.use((config) => {
    const authStore = useAuthStore()
    const accessToken = authStore.token
    const refreshToken = authStore.token
    if (
      ['/refresh_token', '/revoke_token'].includes(config.url)
      && refreshToken
    ) {
      config.headers['Authorization'] = 'Bearer ' + refreshToken
    } else if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken
    }
    return config
  })

  /**
    * @description if any of the API gets 401 status code, this method
    calls getAuthToken method to renew accessToken
    * updates the error configuration and retries all failed requests
    again
  */
  newInstance.interceptors.response.use(
    (config) => {
      return { ...config, body: config.data }
    },
    async (error) => {
      // const _errorResponse = error.response
      // const originalRequest = error.config
      // const status = _errorResponse.status
      // const { authService } = _useAPI()
      // const authStore = useAuthStore()
      // switch (status) {
      //   case 401:
      //     if (['/revoke_token'].includes(originalRequest.url)) {
      //       // if auth_code request fails, redirect to login page
      //       window.location.href = '/login?redirect=/mvno-mos/'
      //     } else if (['/refresh_token'].includes(originalRequest.url)) {
      //       await authStore.logout()
      //       return Promise.reject(error)
      //     } else {
      //       // retry with refrest token first
      //       if (!originalRequest._retry) {
      //         // save request if it is not refresh token request
      //         if (isRefreshingToken) {
      //           return new Promise(function (resolve) {
      //             requestsPending.push(function () {
      //               resolve(newInstance(originalRequest))
      //             })
      //           })
      //         }
      //         originalRequest._retry = true
      //         isRefreshingToken = true

      //         try {
      //           const refreshTokenRes = await authService.post('/refresh_token')

      //           if (refreshTokenRes.status === 200) {
      //             localStorage.setItem(
      //               'access_token',
      //               refreshTokenRes.data.accessToken
      //             )
      //             localStorage.setItem(
      //               'refresh_token',
      //               refreshTokenRes.data.refreshToken
      //             )
      //             originalRequest.headers['Authorization']
      //               = 'Bearer ' + refreshTokenRes.data.accessToken
      //             return newInstance(originalRequest)
      //           } else {
      //             await authStore.logout()
      //           }
      //         } catch (refreshError) {
      //           isRefreshingToken = false
      //           await authStore.logout()
      //           return Promise.reject(refreshError)
      //         } finally {
      //           isRefreshingToken = false
      //           requestsPending.forEach(callback => callback())
      //           requestsPending = []
      //         }
      //       } else {
      //         await authStore.logout()
      //       }
      //     }
      //     break
      //   default:
      //     break
      // }
      // const toast = useToast()
      // toast.add({
      //   id: 'error',
      //   title: 'エラー',
      //   description: 'エラーが発生しました。' + error.message,
      //   color: 'red'
      // })
      return Promise.reject(error)
    }
  )

  return newInstance
}

const _useAPI = () => {
  const runtimeConfig = useRuntimeConfig()
  const adminService = createAxios(runtimeConfig.public.api.adminServiceBaseUrl)
  const authService = createAxios(runtimeConfig.public.api.authServiceBaseUrl)

  return {
    adminService,
    authService
  }
}

export const useAPI = _useAPI
