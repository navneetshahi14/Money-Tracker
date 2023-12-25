const mongoose = require('mongoose')
const mongooseUri = "mongodb://0.0.0.0:27017/MoneyTracker"

const mongooseConnect = () => {
    mongoose.connect(mongooseUri)
    let db = mongoose.connection
    db.on('error',()=>console.log("error"))
    db.once('open',()=>console.log("database Connected"))
}

module.exports = mongooseConnect