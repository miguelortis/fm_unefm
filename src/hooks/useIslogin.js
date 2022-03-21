import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import axios from 'axios'
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const useIsLogin = () => {
  //console.log('se ejecuto')
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context)

  /////////////////SOLICITUD DATOS USUARIO /////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3100/profile', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          //cancelToken: source.token,
        })
        console.log('data', data)
        dispatch({
          type: 'SET_USER_DATA',
          payload: data,
        })
      } catch (error) {
        //console.log(error)
        if (error?.response?.status === 401 && !!localStorage.getItem('token')) {
          localStorage.removeItem('token')
          dispatch({
            type: 'RESET',
          })
        }
      }
    }
    if (!!localStorage.getItem('token') && currentUser === null) {
      console.log('se ejecuto')
      fetchData()
    }

    return () => !!currentUser && source.cancel()
  }, [dispatch, currentUser])

  /////////////////SOLICITUD DATOS FAMILIARES///////////////////////
  // useEffect(() => {
  //   const BeneficiaryData = async () => {
  //     try {
  //       const { data } = await axios.post('http://localhost:3100/fmunefm/beneficiaries', {
  //         id: currentUser?._id,
  //       })
  //       console.log('data', data)
  //       dispatch({
  //         type: 'SET_BENEFICIARIES',
  //         payload: data,
  //       })
  //     } catch (error) {
  //       //console.log(error)
  //       if (error?.response?.status === 401) {
  //         console.log(error)
  //       }
  //     }
  //   }
  //   console.log('data', currentBeneficiaries)
  //   if (!!localStorage.getItem('token') && !currentUser) {
  //     BeneficiaryData()
  //     console.log('se', currentBeneficiaries)
  //   }
  //   console.log('data', currentUser)
  //   return () => !!currentUser && source.cancel()
  // }, [dispatch, currentUser, currentBeneficiaries])
}

export default useIsLogin
