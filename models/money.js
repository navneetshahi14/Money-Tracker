const mongoose = require('mongoose')

const moneySchema  = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    transaction:{
        type:Object,
        default:{}
    }
})

const money = mongoose.model("money",moneySchema)
module.exports = money