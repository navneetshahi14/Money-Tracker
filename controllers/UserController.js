const userModals = require("../models/user")
// const moneyModals = require('../models/money')
const bcrypt = require('bcrypt')
const {ObjectId} = require('mongodb')


const securePassword = async (password) =>{
    try{

        const passwordHashed = await bcrypt.hash(password,10)
        return passwordHashed
        
    }catch(error){
        console.log(error.message)
    }
}

const regis_render = async(req,res) =>{
    try{

        res.render('registration',{message:""})

    }catch(err){
        console.log(err.message)
    }
}

const registration = async (req,res) =>{
    try{

        let name = req.body.name
        let email = req.body.email
        let password = await securePassword(req.body.password)

        const usersearch = await userModals.findOne({email:email})

        if(!usersearch){
            const userRegistration = new userModals({
                name:name,
                email:email,
                password:password
            })
            // const moneyRegis = new moneyModals({
            //     email:email
            // })

            // await moneyRegis.save()
    
            const userDone = await userRegistration.save()
            if(userDone){

                res.redirect('/money-tracker/'+userDone._id)
                // res.render('money-tracker',{email:email})
            }else{
                res.render('registration',{message:"Something Went wrong"})
                // alert("Something Went wrong")
            }
        }else{
            res.render('registration')
            // alert("user with email exists")
        }

        
        
    }catch(err){
        console.log(err.message)
        res.status(500).render('registration',{message:"Something Went wrong"})
        // alert("Something Went wrong")
    }
}

const loadLogin = async(req,res) => {

    try{

        res.render('login')

    }catch(err){
        console.log(err.message)
        // res.status(500).render('login')
    }
}

const Login = async(req,res) =>{
    try{

        let email = req.body.email
        let password = req.body.password

        let usersearchLogin = await userModals.findOne({email:email})

        if(usersearchLogin){
            let passwordmatch = await bcrypt.compare(password,usersearchLogin.password)

            if(passwordmatch){
                res.redirect('/money-tracker/'+usersearchLogin._id)
            }else{
                res.render('login',{message:"wrong Credetials"})
            }
        }else{
            res.redirect('/login')
            res.render('login',{message:"wrong Credetials"})
        }

    }catch(err){
        console.log(err.message)
    }
}


const loadMoney = async(req,res) =>{
    try{
        let _id = req.params._id
        // console.log(_id)
        const userS = await userModals.findOne({"_id":_id})
        // console.log(userS.email)
        // const money = await moneyModals.find({"email":userS.email})
        // console.log(money)
        // console.log(money.transaction.length)
        res.render('money-tracker',{user:userS})
    }catch(err){
        console.log(err.message)
    }
}

const addmoney = async(req,res) =>{
    try{

        let Eemail = req.body.email
        let Eid = req.body.Uid
        let Etitle = req.body.text
        let Emoney = req.body.Amt
        let Etype = req.body.type
        let Edate = req.body.date

        let TransactionId = new ObjectId()

        // let user = await userModals.findOne({"email":Eemail})
        // console.log(Eemail)
        // console.log(Eid)
        // console.log(Etitle)
        // console.log(Emoney)
        // console.log(Etype)
        // console.log(Edate)
        // console.log(user.email)
        let moneyF = await userModals.findOne({"email":Eemail})
        // let userId = moneyF._id
        console.log(moneyF)
        console.log(TransactionId)

        await userModals.findByIdAndUpdate({_id:moneyF._id},{
            $push:{
                "transaction":{ _id:TransactionId , title:Etitle ,money:Emoney,type:Etype,date:Edate}
            }
        })
        

        res.status(200).send({ success:true,msg:"transaction added" })

    }catch(err){
        console.log(err)
    }
}

const logout = async(req,res)=>{
    try{
        
        req.session.destroy()
        res.redirect('/login')
        // console.log(req.session)


    }catch(err){
        console.log(err.message)
    }
}


module.exports = {
    regis_render,
    registration,
    loadLogin,
    Login,
    loadMoney,
    addmoney,
    logout



}
