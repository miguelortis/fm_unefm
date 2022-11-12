import io from 'socket.io-client'

let socket = io(`${process.env.REACT_APP_TEST_URL}`, {
  forceNew: true,
  transports: ['websocket', 'polling'],
})

export default socket
