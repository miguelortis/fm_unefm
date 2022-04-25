import io from 'socket.io-client'

let socket = io('https://backend-fmunefm.vercel.app/', {
  transports: ['websocket', 'polling', 'flashsocket'],
  reconnect: true,
  'reconnection delay': 500,
  'max reconnection attempts': 10,
})

export default socket
