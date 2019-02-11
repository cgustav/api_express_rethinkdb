require('dotenv').config()

const Thinky = require('thinky')


const think = Thinky({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    authKey: process.env.DB_AUTHKEY,
    db: process.env.DB_NAME
})

const ready = () => think.dbReady()
    .then(() => {
        console.log('db ready!!')
    })
    .catch(err => {
        console.log('Ups: ', err)
        //
    })

const r = think.r
const type = think.type

module.exports = {
    think,
    ready,
    r,
    type
}