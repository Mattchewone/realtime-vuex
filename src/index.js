/* eslint-disable no-console */
const mainApp = require('./sub-app')

const logger = require('./logger')
const app = require('./app')
const port = app.get('port')

// Start the server
const server = mainApp.listen(port)

// Now call setup on the Feathers app with the server
app.setup(server)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info(`Feathers application started on ${app.get('host')}:${port}`)
)
