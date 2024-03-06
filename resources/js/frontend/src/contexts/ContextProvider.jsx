import axios from 'axios'
import propTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
})

export const ContextProvider = ({ children }) => {
  const axiosClient = axios.create({
    baseURL: '/api',
  })

  const [user, setUser] = useState({})
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

  axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token)
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }

  return (
    <StateContext.Provider
      value={{
        axiosClient,
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

ContextProvider.propTypes = {
  children: propTypes.node,
}
export const useStateContext = () => useContext(StateContext)
