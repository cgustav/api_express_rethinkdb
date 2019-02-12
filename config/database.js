const Thinky = require('thinky')
require('dotenv').config()

const think = Thinky({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '28015',
    authKey: process.env.DB_AUTHKEY || '',
    db: process.env.DB_NAME || 'ozen_db'
})

const ready = () => think.dbReady()
    .then(() => {
        console.log('db ready!!')
    })
    .catch(err => {
        console.log('Ups: ', err)
    })

const r = think.r
const type = think.type

module.exports = {
    think,
    ready,
    r,
    type
}

