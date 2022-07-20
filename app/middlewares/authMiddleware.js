const fs= require('fs')
const jwt = require('jsonwebtoken')
const apiResponse=require('../helpers/apiResponse')

/**
 * Middleware function to handle actual request
 * Validate the JWT token using RSA keys
 * Validate for the specific organization compared to the desired endpoint/role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {403 | 401} Response Status with Error
 */
exports.authenticateTokenApi = (req, res, next) => {
    try{
        const authHeader = req.headers['token']
        //console.log('token=='+authHeader);
        const token = authHeader && authHeader.split(' ')[1]
        const publicKEY  = fs.readFileSync('./rsa/public.key', 'utf8')

        jwt.verify(token, publicKEY, {algorithm:"RS256", expiresIn:'1d'},async function(err, decodedToken) {
            if(err) {
                return res.status(403).send(apiResponse.error(err.message)) //may be token missing or time is expired.
            }
            else {
                req.user_id = decodedToken.id   // Add to req object
                next()
            }
        });
    }
    catch(error){
        //if an error occured return request unauthorized error
        return res.status(401).send(apiResponse.error(error.message))
    }
}