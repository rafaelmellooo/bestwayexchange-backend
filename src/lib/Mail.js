const path = require('path')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars')
const nodemailerhbs = require('nodemailer-express-handlebars')

const { host, port, auth } = require('../config/mail')

const transport = nodemailer.createTransport({
  host,
  port,
  auth
})

const viewPath = path.resolve(__dirname, '..', 'app', 'views', 'emails')

transport.use('compile', nodemailerhbs({
  viewEngine: exphbs.create({
    extname: '.hbs',
    partialsDir: path.resolve(viewPath, 'partials'),
    defaultLayout: 'default',
    layoutsDir: path.resolve(viewPath, 'layouts')
  }),
  viewPath,
  extName: '.hbs'
}))

module.exports = transport
