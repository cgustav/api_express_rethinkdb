const {
    think,
    type,
    r
} = require('../../config/database')

const bcrypt = require('bcryptjs')

const user_schema = think.createModel(
    'users', {
        id: type.string(),
        name: type.string().max(255),
        username: type.string().max(50),
        email: type.string().max(200),
        birthdate: type.date(),
        auth: {
            password: type.string(),
        },
        createdAt: type.date().default(r.now())
    }
)

//user_schema.hasMany(identities, 'identities', 'id', 'user_id')

user_schema.getView = async function (username) {

    try {
        /* DEPRECATED
        let users = await this.filter(r.row('username').eq(username)).without('auth')
        return users[0]
        */
        return await r.db('ozen_db').table('users').filter(r.row('username').eq(username))
            .without(['auth'])
            .merge(function (user) {
                return {
                    identities: r.db('ozen_db').table('identities')
                        .getAll(user('id'), {
                            index: 'user_id'
                        })
                        .without(['createdAt', 'id', 'user_id'])
                        .coerceTo('array')
                }
            })

    } catch (error) {
        console.log('DB cannot get view :  ', error)
        return null
    }
}

user_schema.getAllView = async function () {

    try {
        /* IDENTITIES
        return await r.db('ozen_db').table('identities')
            .eqJoin('user_id', r.db('ozen_db').table('users'))
            .map(function (seq) {
                return seq('right').without(['id', 'auth']).merge({
                    identities: seq('left').without(['id', 'createdAt', 'user_id'])
                })
            })
        */
        /* DEPRECATED
        return await this.without('auth')
        */
        return await r.db('ozen_db').table('users')
            .without(['auth'])
            .merge(function (user) {
                return {
                    identities: r.db('ozen_db').table('identities')
                        .getAll(user('id'), {
                            index: 'user_id'
                        })
                        .without(['createdAt', 'id', 'user_id'])
                        .coerceTo('array')
                }
            })

    } catch (error) {
        console.log('DB cannot get all views :  ', error)
        return null
    }
}

user_schema.getUserByUsername = async function (username) {
    try {

        let users = await this.filter(r.row('username').eq(username))
        if (users.length) return users[0]

        return null
    } catch (error) {
        console.log('DB cannot get user :  ', error)
        return null
    }
}

user_schema.comparePassword = async function (password) {
    try {

        return await bcrypt.compare(password, this.auth.password)
    } catch (error) {
        console.log('DB cannot get user :  ', error)
        return null
    }
}


user_schema.docAddListener('saved', function (doc) {
    console.log('[log] user created: (', doc.username, ')', '(', doc.id, ')')
});

user_schema.addListener('retrieved', function (doc) {
    doc.retrieved = new Date();
});


module.exports = user_schema;