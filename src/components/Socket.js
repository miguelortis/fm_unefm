import io from 'socket.io-client'

let socket = io('ws://backend-fmunefm.vercel.app', {
  forceNew: true,
  transports: ['polling', 'flashsocket'],
})

export default socket
