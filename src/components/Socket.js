import io from 'socket.io-client'

let socket = io('http://localhost:3100', { transports: ['websocket', 'polling', 'flashsocket'] })

export default socket
