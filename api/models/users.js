/*
const thinky = require('thinky')();
const type = thinky.type;
const r = thinky.r;
*/
const {
    think,
    type,
    r
} = require('../../config/database')

const user_schema = think.createModel(
    'users', {
        id: type.string().uuid(4),
        name: type.string().max(255),
        email: {
            address: type.string().email(),
            verified: type.boolean().default(false),
        },
        birthdate: type.date(),
        auth: {
            password: type.string(),
            facebook: type.string(),
            google: type.string(),
        },
        createdAt: type.date().default(r.now())
    }
)

module.exports = user_schema;
//const think = require('../../config/database')
/*
const type = think.type
const r =  think.r
*/
// Create a model - the table is automatically created
/*
const user_schema = thinky.createModel("Users", {
    id: String,
    username: String,
    email: String,
    password: String,
    birthDate: Date,
   // createdAt: type.date().default()
})

module.exports = user_schema;
*/