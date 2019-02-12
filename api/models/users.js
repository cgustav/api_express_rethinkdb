const {
    think,
    type,
    r
} = require('../../config/database')



const user_schema = think.createModel(
    'users', {
        id: type.string().uuid(4),
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

user_schema.getView = async function (username) {

    try {

        let users = await this.filter(r.row('username').eq(username))

        if (users.length) {
            delete users[0].auth
            return users[0]
        }

        return null
    } catch (error) {
        console.log('DB cannot get view :  ', error)
        return null
    }
}

user_schema.getAllView = async function () {

    try {

        let users = await this.run()

        if (users.length) {
            for (const _user of users) {
                delete _user.auth
            }

            return users
        }

        return null
    } catch (error) {
        console.log('DB cannot get all views :  ', error)
        return null
    }
}

user_schema.getUserByUsername = async (username) => {
    try {

        let users = await this.filter(r.row('username').eq(username))

        if (users.length) return users[0]

        return null
    } catch (error) {
        console.log('DB cannot get user :  ', error)
        return null
    }
}

user_schema.docAddListener('saved', (user) => {

    console.log('[log] user created')
});

user_schema.addListener('retrieved', (doc) => {

    doc.retrieved = new Date();
});


module.exports = user_schema;