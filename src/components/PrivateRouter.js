import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useIsLogin from 'src/hooks/useIslogin'
import useIsDataTotal from 'src/hooks/useIsDataTotal'
import useIsConsultationsPending from '../hooks/useIsConsultationsPending'

function PrivateRoute({ ...rest }) {
  useIsLogin()
  useIsDataTotal()
  useIsConsultationsPending()
  const adminToken = localStorage.getItem('token')
  if (!adminToken) {
    return <Redirect to="/home" />
  }

  return (
    <>
      <Route {...rest} />
    </>
  )
}

export default PrivateRoute
