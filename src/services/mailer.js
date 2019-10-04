const { resolve } = require('path')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars')
const nodemailerhbs = require('nodemailer-express-handlebars')

const { host, port, user, pass } = require('../config/mail')

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
})

const viewPath = resolve(__dirname, '..', 'templates', 'mail')

transport.use('compile', nodemailerhbs({
  viewEngine: exphbs.create({
    extname: '.hbs',
    partialsDir: resolve(viewPath, 'partials'),
    defaultLayout: 'default',
    layoutsDir: resolve(viewPath, 'layouts')
  }),
  viewPath,
  extName: '.hbs'
}))

module.exports = transport
