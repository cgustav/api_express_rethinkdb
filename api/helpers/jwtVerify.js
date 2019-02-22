const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

module.exports = (token, options) => {
    //TODO verify if option is an object
    let publicKey = fs.readFileSync(path.join(process.cwd(), '/public.key'), 'utf8')

    options.expiresIn = "10m"
    options.algorithm = ["RS256"]

    try {

        return jwt.verify(token, publicKey, options)

    } catch (error) {
        throw error
    }
}