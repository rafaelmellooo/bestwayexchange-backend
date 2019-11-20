const { resolve } = require('path')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars')
const nodemailerhbs = require('nodemailer-express-handlebars')

const { host, port, auth } = require('../config/mail')

const { user, pass } = auth

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
})

const viewPath = resolve(__dirname, '..', 'templates', 'mail')

transport.use('compile', nodemailerhbs({
  viewEngine: exphbs.create({
    extname: '.html',
    partialsDir: resolve(viewPath, 'partials'),
    defaultLayout: 'default',
    layoutsDir: resolve(viewPath, 'layouts')
  }),
  viewPath,
  extName: '.html'
}))

module.exports = transport
