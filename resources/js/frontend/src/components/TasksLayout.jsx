import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from '../axios-client';

export default function TasksLayout() {
  const { token, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (event) => {
    event.preventDefault();

    axiosClient.post('/auth/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  })

  return (
    <div>
      TasksLayout
      <Outlet />
    </div>
  )
}