const fs = require('fs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const apiResponse = require('../helpers/apiResponse')

exports.login= async (req, res) => {
    try{
        const body=req.body
        //check in DB
        const user=await User.findOne({email: body.email, password: body.password})
        if (user){
            //generate token using RSA keys
            const privateKEY  = fs.readFileSync('./rsa/private.key', 'utf8')
            const token = jwt.sign({ id: user._id }, privateKEY,{algorithm:"RS256", expiresIn:'1d'})

            user.token=token
            user.save()

            const data={user:user}
            return res.status(200).send(apiResponse.success("Success!", data))
        }
        else{
            return res.status(200).send(apiResponse.error('Email or password is incorrect.'))
        }
    }
    catch (error){
        return res.status(422).send(apiResponse.error(error.message))
    }
}

exports.logout= async (req, res) => {
    try{
        //find current logged in user and remove token
        const user=await User.findById(req.user_id)
        console.log(user)
        user.token=''
        user.save()

        return res.status(200).send(apiResponse.success("Logged Out!"))
    }
    catch (error){
        return res.status(error.status || 400).send(apiResponse.error(error.message))
    }
}