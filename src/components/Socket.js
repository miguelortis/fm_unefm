import io from 'socket.io-client'

let socket = io('http://backend-fmunefm.vercel.app', {
  forceNew: true,
  transports: ['websocket', 'polling'],
})

export default socket
