import { io } from 'socket.io-client'

// In dev, Vite proxy handles /api but sockets need the direct backend origin
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

const socket = io(SOCKET_URL, {
  autoConnect: true,
})

export default socket
