const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

module.exports = (token, options) => {
    //TODO verify if option is an object
    try {
        options = JSON.parse(JSON.stringify(options))
        options.expiresIn = "50m"
        options.algorithm = ["RS256"]

        const PUBLIC_KEY = fs.readFileSync(path.join(process.cwd(), '/public.key'), 'utf8')

        return jwt.verify(token, PUBLIC_KEY, options)

    } catch (error) {
        throw error
    }
}