import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import axios from 'axios'
//const CancelToken = axios.CancelToken
//const source = CancelToken.source()
const useIsDataTotal = () => {
  //console.log('se ejecuto')
  const {
    state: { dataTotal, currentUser },
    dispatch,
  } = useContext(Context)

  useEffect(() => {
    //////////////////SOLICITUD DATOS FAMILIARES///////////////////////
    const DataTotal = async () => {
      try {
        const { data } = await axios.get('http://localhost:3100/fmunefm/consult', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          //cancelToken: source.token,
        })
        console.log(data)
        dispatch({
          type: 'SET_DATA_TOTAL',
          payload: data,
        })
      } catch (error) {
        //console.log(error)
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
      console.log(dataTotal)
    }
    if (
      (!!localStorage.getItem('token') && currentUser?.role === 'fAmDuMnIeNfm') ||
      currentUser?.role === 'fRmEuCnEePfCmION'
    ) {
      console.log('se ejecuto')
      DataTotal()
    }
  }, [dispatch, currentUser])
}

export default useIsDataTotal
