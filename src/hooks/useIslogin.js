import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

let Socket = io()

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
        const { data } = await axios.get('https://backend-fmunefm.herokuapp.com/profile', {
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
    Socket = io('http://localhost:3100', {
      transports: ['websocket', 'polling', 'flashsocket'],
      reconnect: true,
      'reconnection delay': 500,
      'max reconnection attempts': 10,
    })
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
