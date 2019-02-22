const jwtVerify = require('../helpers/jwtVerify')

module.exports = (req, res, next) => {

    let bearerHeader = req.headers["authorization"]
    if (bearerHeader === undefined) return res.sendStatus(403)

    let token = bearerHeader.split(' ')[1]

    if (!token) return res.sendStatus(403)

    let options = {
        issuer: 'My API info',
        subject: 'me@example.com',
        audience: 'http://this.api'
    }

    try {

        let authPass = jwtVerify(token, options)

        if (!authPass) return res.status(500).send("Internal Auth Error")

        req.auth_user = authPass;
        next();

    } catch (error) {
        return res.status(500).send(error) //TODO improve responses
    }

}