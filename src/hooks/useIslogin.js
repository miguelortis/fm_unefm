import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Socket from '../components/Socket'
import { useDispatch, useSelector } from 'react-redux'

// const CancelToken = axios.CancelToken
// const source = CancelToken.source()
const useIsLogin = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const history = useHistory()
 /*  const {
    state: { currentUser, packages },
    dispatch,
  } = useContext(Context) */
  /////////////////SOLICITUD DATOS USUARIO /////////////////////////https://servidor-fmunefm.herokuapp.com/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_TEST_URL}/auth/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        dispatch({
          type: 'SAVE_USER',
          payload: data.content,
        })
      } catch (error) {
        //console.log(error)
        if (error?.response?.status === 401 && !!localStorage.getItem('token')) {
          localStorage.removeItem('token')
          dispatch({
            type: 'RESET',
          })
          history.push('/login')
        }
      }
    }
    if (!!localStorage.getItem('token') && user === null) {
      fetchData()
    }
  }, [dispatch, user, history])
  /////////////PACKAGES////////////////////////////
  useEffect(() => {
    const handlePackages = async () => {
      try {
        const { data } = await axios.get('https://servidor-fmunefm.herokuapp.com/package/datas', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        dispatch({
          type: 'SET_ PACKAGES',
          payload: data,
        })
      } catch (error) {
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
    }
    if (!!localStorage.getItem('token') && user?.role?.options?.find(role => role.code === 12)) {

      handlePackages()
    }


  }, [dispatch, user])
  //////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
}

export default useIsLogin
