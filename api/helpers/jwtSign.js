const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

module.exports = (payload, options) => {
    //TODO verify if option is an object
    payload = JSON.parse(JSON.stringify(payload))
    let privateKey = fs.readFileSync(path.join(process.cwd(), '/private.key'), 'utf8')

    options.expiresIn = "10m"
    options.algorithm = "RS256"

    try {

        return jwt.sign(payload, privateKey, options)

    } catch (error) {
        throw error
    }
}