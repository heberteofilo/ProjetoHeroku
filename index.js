const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// PROJETO SECVIEW HEROKU
// -- Criação de rotas e atalhos --
express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/css', express.static(path.join(__dirname, 'public/stylesheets')))
  .use('/img', express.static(path.join(__dirname, 'public/images')))
  .use('/js', express.static(path.join(__dirname, 'public/js')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
