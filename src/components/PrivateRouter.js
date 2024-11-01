import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useIsLogin from 'src/hooks/useIslogin'
import useIsDataTotal from 'src/hooks/useIsDataTotal'
import useIsConsultationsPending from '../hooks/useIsConsultationsPending'
import { useSelector } from 'react-redux'

function PrivateRoute({ ...rest }) {
  const user = useSelector((state) => state.user)
  useIsLogin()
  //useIsDataTotal()
  //useIsConsultationsPending()
  const token = localStorage.getItem('token')
  if (!token && !user) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Route {...rest} />
    </>
  )
}

export default PrivateRoute
