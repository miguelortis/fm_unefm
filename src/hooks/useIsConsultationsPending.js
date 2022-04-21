import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import axios from 'axios'
//const CancelToken = axios.CancelToken
//const source = CancelToken.source()
const useIsConsultationsPending = () => {
  //console.log('se ejecuto')
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context)

  useEffect(() => {
    //////////////////SOLICITUD CONSULTAS EN ESPERA///////////////////////
    const ConsultationsPending = async () => {
      try {
        const { data } = await axios.get('http://localhost:3100/fmunefm/consultationspending', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          //cancelToken: source.token,
        })
        console.log(data)
        dispatch({
          type: 'SET_CONSULTATIONS',
          payload: [...data],
        })
      } catch (error) {
        //console.log(error)
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
      //console.log(dataTotal)
    }
    if (!!localStorage.getItem('token') && currentUser?.role === 'fRmEuCnEePfCmION') {
      console.log('se ejecuto')
      ConsultationsPending()
    }
  }, [dispatch, currentUser])
}

export default useIsConsultationsPending
