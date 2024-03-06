import axios from 'axios'
import { useEffect } from 'react'

export const usePathAxios = () => {
  axios.defaults.baseURL = '/api'

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('ACCESS_TOKEN')
      config.headers.Authorization = `Bearer ${token}`
      return config
    })
  
    axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        const { response } = error
        if (response?.status == 401) {
          localStorage.removeItem('ACCESS_TOKEN')
        }
  
        throw error
      }
    )
  }, [])
}
