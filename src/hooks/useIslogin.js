import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Socket from '../components/Socket'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
const useIsLogin = () => {
  const history = useHistory()
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context)

  /////////////////SOLICITUD DATOS USUARIO /////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://fmunefm-backend.herokuapp.com/profile', {
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
          history.push('/account')
        }
      }
    }
    if (!!localStorage.getItem('token') && currentUser === null) {
      fetchData()
    }

    return () => !!currentUser && source.cancel()
  }, [dispatch, currentUser, history])
  //////////////////////////////////////////////////
  useEffect(() => {
    Socket.emit('addUser', currentUser?._id, currentUser?.role)
    Socket.on('getUsers', (users) => {
      console.log(users)
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    })
  }, [currentUser])
  ///////////////////////////////////////////////////////////////////
}

export default useIsLogin
