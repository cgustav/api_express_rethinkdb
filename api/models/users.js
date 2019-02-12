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
        username: type.string().max(20),
        email: type.string().max(200),
        birthdate: type.date(),
        auth: {
            password: type.string().default(function () {
                this.password = 'shit'
            }),
            facebook: type.string(),
            google: type.string(),
        },
        createdAt: type.date().default(r.now())
    }
)

user_schema.getView = async function (username) {

    const users = await this.filter({
        username
    })

    if (users.length) {
        delete users[0].auth
        return users[0]
    }

    return null
}

user_schema.getAllView = async function (username) {

    const users = await this.filter({
        username
    })

    if (users.length) {
        delete users[0].auth
        return users[0]
    }

    return null
}
/*
user_schema.docAddListener('saving', function (user) {
    const bcrypt = require('bcryptjs')

    bcrypt.genSalt()
        .then(salt => {
            bcrypt.hash(user.auth.password, salt)
                .then(hash => {
                    user.auth.password = 'hash'
                    console.log(user.auth.password)
                    console.log('you hashed!')
                    //return user.saveAll()

                })
                .catch(err => {
                    console.log('bcrypt cannot hash :  ', err)
                })
        })
        .catch(err => {
            console.log('bcrypt cannot salt :  ', err)
        })


});
*/

user_schema.docAddListener('saved', function (user) {
    console.log('[log] user created with')

});

user_schema.addListener('retrieved', function (doc) {

    doc.retrieved = new Date();
});


module.exports = user_schema;