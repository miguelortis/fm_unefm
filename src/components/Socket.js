import io from 'socket.io-client'

let socket = io('https://fmunefm-backend.herokuapp.com/', {
  forceNew: true,
  transports: ['websocket', 'polling'],
})

export default socket
