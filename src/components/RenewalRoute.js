import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useIsLogin from 'src/hooks/useIslogin'
import useIsDataTotal from 'src/hooks/useIsDataTotal'
import useIsConsultationsPending from '../hooks/useIsConsultationsPending'
import { useSelector } from 'react-redux'

function RenewalRoute({ ...rest }) {
  const user = useSelector((state) => state.user)
  useIsLogin()
  //useIsDataTotal()
  //useIsConsultationsPending()
  const oldUserToken = localStorage.getItem('oldUserToken')
  if(!oldUserToken && !user){
    return <Redirect to="/renewal" />
  }else{
    return (
      <>
        <Route {...rest} />
      </>
    )
  }
  
}

export default RenewalRoute
