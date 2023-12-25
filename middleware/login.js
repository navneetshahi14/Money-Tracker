const isLogin =  async (req,res,next)=>{
    try{

        if(req.session._id){
            console.log('login')
            console.log("error1")
        }
        // else{
        //     res.redirect('/registration')
        //     console.log("error2")
        // }
        next()
    }catch(error){
        console.log(error.message)
    }
}

const isLogout = async(req,res,next) =>{
    try{
        if(req.session._id){
            res.redirect('/money-tracker/:_id')
            console.log("error3")
        }
        next()
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    isLogin,
    isLogout,


}