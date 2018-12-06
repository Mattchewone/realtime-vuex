/* eslint-disable no-console */
const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const express = require('@feathersjs/express')

const app = require('./app')

const server = express()
  // Enable CORS, security, compression, favicon
  .use(cors())
  .use(helmet())
  .use(compress())
  .use(favicon(path.join(app.get('public'), 'favicon.ico')))
  // Host the public folder
  .use('/', express.static(app.get('public')))
  .use('/api', app)
  // Catch all for public files
  .use('*', (req, res) => {
    res.sendFile(path.join(app.get('public'), 'index.html'))
  })

module.exports = server
