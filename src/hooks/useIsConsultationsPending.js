import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import io from 'socket.io-client'
let Socket = io()
//const CancelToken = axios.CancelToken
//const source = CancelToken.source()
const useIsConsultationsPending = () => {
  //console.log('se ejecuto')
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context)

  let role = currentUser?.role
  //////////////////////////////////////////////////
  useEffect(() => {
    Socket = io('http://localhost:3100', {
      transports: ['websocket', 'polling', 'flashsocket'],
      reconnect: true,
      'reconnection delay': 500,
      'max reconnection attempts': 10,
    })
    Socket.on(role, (pendingConsultations) => {
      console.log(pendingConsultations)
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
      dispatch({
        type: 'SET_CONSULTATIONS',
        payload: [...pendingConsultations],
      })
    })
  }, [role, dispatch])
  ///////////////////////////////////////////////////////////////////
}
export default useIsConsultationsPending
