import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import Socket from '../components/Socket'
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
