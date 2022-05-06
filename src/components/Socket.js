import io from 'socket.io-client'

let socket = io('https://servidor-fmunefm.herokuapp.com/', {
  forceNew: true,
  transports: ['websocket', 'polling'],
})

export default socket
