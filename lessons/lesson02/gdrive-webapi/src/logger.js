import pino from 'pino'
import { Server } from 'socket.io'
const logger = pino({
  prettyPrint: {
    ignore: 'pid,hostname'
  }
})

export {
  logger,
}
