const express = require('express')
const app = express()
const mongooseConnect = require('./db/db')

const portNo = process.env.PORT || 3000

mongooseConnect()



app.set('view engine' , 'ejs')
const user_router = require('./routes/UserRoutes')
app.use('/',user_router)

app.listen(portNo,()=>{
    console.log('port No 3000')
})