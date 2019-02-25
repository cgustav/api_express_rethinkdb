const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

module.exports = (payload, options) => {

    try {

        //TODO verify if option is an object
        payload = JSON.parse(JSON.stringify(payload))
        options = JSON.parse(JSON.stringify(options))
        options.expiresIn = "50m"
        options.algorithm = "RS256"

        const PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), '/private.key'), 'utf8')

        return jwt.sign(payload, PRIVATE_KEY, options)

    } catch (error) {
        throw error
    }
}