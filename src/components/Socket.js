import io from 'socket.io-client'

let socket = io('http://localhost:3100/', {
  forceNew: true,
  transports: ['websocket', 'polling'],
})

export default socket
