const path = require('path')
const nodemailer = require('nodemailer')
const nodemailerhbs = require('nodemailer-express-handlebars')

const { host, port, user, pass } = require('../config/mail')

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
})

const viewPath = path.resolve(__dirname, '..', 'resources', 'mail')

transport.use('compile', nodemailerhbs({
  viewEngine: {
    partialsDir: viewPath,
    defaultLayout: ''
  },
  viewPath,
  extName: '.html'
}))

module.exports = transport
