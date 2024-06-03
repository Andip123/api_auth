const routes = require("express").Router();
const {auth} = require('../controller/')
const middlewares = require('../middlewares/middlewares')

routes.get('/whoami', middlewares.auth, auth.whoami)
routes.post('/register', auth.register)
routes.post('/login', auth.login)


module.exports=routes