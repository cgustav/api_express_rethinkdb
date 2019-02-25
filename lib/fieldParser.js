const isEmpty = require('./queryValidator')

/*=============================================
=                ValidaTron                   =
=============================================*/
const validaTron = (payload, res) => {
    let container = {}

    try {

        for (const prop in payload) {
            let value = payload[prop]
            if (container.stop) return null

            switchPatch(prop, value, container, res)
        }
        return container

    } catch (error) {
        //console.log(error)
        return null
    }
}


/*=============================================
=                OBJECT VALIDATORS            =
=============================================*/

//UPDATE: PATCH 
function switchPatch(prop, value, container, res) {

    switch (prop) {
        case 'username':
            return parseRequiredField(prop, value, container, res)

        case 'password':
            return parseRequiredField(prop, value, container, res)

        case 'email':
            return parseEmail(prop, value, container, res)

        case 'displayName':
            return parseRelaxedField(prop, value, container, res)

        case 'birthDate':
            return parseDate(prop, value, container, res)

        case 'photo':
            return parseURI(prop, value, container, res)

    }
}



/*=============================================
=                   PARSERS                   =
=============================================*/

function parseRelaxedField(prop, value, object, res) {

    //console.log(`${prop} : ${value}`)
    if (isEmpty(value)) {
        object.stop = true
        return res.status(400).send(`${prop} is required`)
    }

    return object[prop] = value

}

function parseRequiredField(prop, value, object, res) {

    //console.log(`${prop} : ${value}`)
    if (isEmpty(value) || value.length < 5) {
        object.stop = true
        return res.status(400).send(`${prop} is required (at least 5 characters)`)
    }

    return object[prop] = value

}

function parseEmail(prop, value, object, res) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (isEmpty(value) || !emailRegex.test(value)) {
        object.stop = true
        return res.status(400).send(`invalid ${prop} format (e.g email@example.com)`)
    }

    return object[prop] = value
}

function parseDate(prop, value, object, res) {
    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/

    //console.log(property, ' : ', value)

    if (isEmpty(value) || !dateRegex.test(value)) {
        object.stop = true
        return res.status(400).send(`Invalid ${prop} format (e.g YYYY-MM-DD)`)
    }

    return object[prop] = value
}

function parseURI(prop, value, object, res) {

    const regHTTPS = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    const regHTTP = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

    if (isEmpty(value) || !regHTTP.test(value) || !regHTTPS.test(value)) {
        object.stop = true
        return res.status(400).send(`invalid ${prop} format (e.g https://img.com/xdErdk)`)
    }

    return object[prop] = value

}

module.exports = validaTron;