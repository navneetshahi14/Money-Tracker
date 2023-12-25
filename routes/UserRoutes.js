const express = require('express')
const user_Router = express()
const bodyParser = require('body-parser')
user_Router.use(bodyParser.json())
user_Router.use(bodyParser.urlencoded({extended:true}))

user_Router.set('view engine','ejs')
user_Router.set('views','./views')

const path = require('path')
const intial_path = path.join(__dirname,'../public')
user_Router.use(express.static('public'))

const session = require('express-session')
const config = require('../config/config')

user_Router.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}))

const userController = require('../controllers/UserController')
const Auth = require('../middleware/login')

user_Router.get('/registration',Auth.isLogout,userController.regis_render)
user_Router.post('/registration',userController.registration)

user_Router.get('/login',Auth.isLogout,userController.loadLogin)
user_Router.post('/login',userController.Login)

user_Router.get('/money-tracker/:_id',Auth.isLogin,userController.loadMoney)
user_Router.post('/add-money',userController.addmoney)

user_Router.get('/logout',Auth.isLogout,userController.logout)

module.exports = user_Router
