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
        email: type.string().max(200),
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