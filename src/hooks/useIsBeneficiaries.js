import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import axios from 'axios'
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const useIsBeneficiaries = () => {
  //console.log('se ejecuto')
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context)

  /////////////////SOLICITUD DATOS USUARIO /////////////////////////
  useEffect(() => {
    /////////////////SOLICITUD DATOS FAMILIARES///////////////////////
    const BeneficiaryData = async () => {
      try {
        const data = await axios.post('http://localhost:3100/fmunefm/beneficiaries', {
          id: currentUser?.dataUser._id,
        })
        //console.log('data', data.data)
        dispatch({
          type: 'SET_USER_DATA',
          payload: { dataBeneficiaries: data.data },
        })
      } catch (error) {
        //console.log(error)
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
    }

    return () => !!currentUser
  }, [dispatch, currentUser])
}

export default useIsBeneficiaries
