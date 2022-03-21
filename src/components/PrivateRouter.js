import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useIsLogin from 'src/hooks/useIslogin'

function PrivateRoute({ ...rest }) {
  useIsLogin()

  const adminToken = localStorage.getItem('token')
  if (!adminToken) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Route {...rest} />
    </>
  )
}

export default PrivateRoute
