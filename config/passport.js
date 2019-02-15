let {
    user,
    identities
} = require('../api/models/index');
const dotenv = require('dotenv').config()
const bcrypt = require('bcryptjs')
//strategy
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github').Strategy
const GitLabStrategy = require('passport-gitlab2').Strategy

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.

module.exports = function (passport) {

    // Serializes the user to store it in the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // Deserialize the stored user object in the session to use it
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });


    /*=============================================
    =               LOCAL STRAGEGY                =
    =============================================*/
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                let match
                let data = await user.getUserByUsername(username)

                if (data) match = await bcrypt.compare(password, data.auth.password)
                if (match) return done(null, data)

                return done(null, false)
            } catch (error) {
                console.log('cannot authenticate :  ', error)
                return done(error)
            }
        }
    ));


    /*=============================================
    =               GITHUB STRAGEGY               =
    =============================================*/
    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback"
        },
        async function (accessToken, refreshToken, profile, cb) {

            try {

                let data = await identities.filter({
                    provider: profile.provider,
                    extern_uid: profile.id
                })

                if (data[0]) return cb(null, data)

                let _user = await new user({
                    name: profile.displayName,
                    username: profile.username,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value,
                    location: profile._json.location
                }).save()

                let _identity = await new identities({
                    provider: profile.provider,
                    extern_uid: profile.id,
                    profile_url: profile.profileUrl,
                    user_id: _user.id
                }).save()

                return cb(null, _user)

            } catch (error) {
                console.log('cannot authenticate github access :  ', error)
                return cb(error)
            }
        }
    ));



    /*=============================================
    =               GITLAB STRAGEGY               =
    =============================================*/
    passport.use(new GitLabStrategy({
            clientID: process.env.GITLAB_CLIENT_ID,
            clientSecret: process.env.GITLAB_CLIENT_SECRET,
            callbackURL: "/auth/gitlab/callback"
        },
        async function (accessToken, refreshToken, profile, cb) {

            try {

                let data = await identities.filter({
                    provider: profile.provider,
                    extern_uid: profile.id
                })

                if (data[0]) return cb(null, data)

                let _user = await new user({
                    name: profile.displayName,
                    username: profile.username,
                    email: profile.emails[0].value,
                    photo: profile.avatarUrl,
                    location: profile._json.location
                }).save()

                let _identity = await new identities({
                    provider: profile.provider,
                    extern_uid: profile.id,
                    profile_url: profile.profileUrl,
                    user_id: _user.id
                }).save()

                //console.log(_user)

                return cb(false, _user)
            } catch (error) {
                console.log('cannot authenticate gitlab access :  ', error)
                return cb(error)
            }
        }
    ));

    /*
    // Configuración del autenticado con Twitter
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.key,
        consumerSecret: config.twitter.secret,
        callbackURL: '/auth/twitter/callback'
    }, function (accessToken, refreshToken, profile, done) {
        // Busca en la base de datos si el usuario ya se autenticó en otro
        // momento y ya está almacenado en ella
        User.findOne({
            provider_id: profile.id
        }, function (err, user) {
            if (err) throw (err);
            // Si existe en la Base de Datos, lo devuelve
            if (!err && user != null) return done(null, user);

            // Si no existe crea un nuevo objecto usuario
            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                photo: profile.photos[0].value
            });
            //...y lo almacena en la base de datos
            user.save(function (err) {
                if (err) throw err;
                done(null, user);
            });
        });
    }));
*/

    /*
        // Configuración del autenticado con Facebook
        passport.use(new FacebookStrategy({
            clientID: config.facebook.key,
            clientSecret: config.facebook.secret,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', //'provider', 'photos']
        }, function (accessToken, refreshToken, profile, done) {
            // El campo 'profileFields' nos permite que los campos que almacenamos
            // se llamen igual tanto para si el usuario se autentica por Twitter o
            // por Facebook, ya que cada proveedor entrega los datos en el JSON con
            // un nombre diferente.
            // Passport esto lo sabe y nos lo pone más sencillo con ese campo
            User.findOne({
                provider_id: profile.id
            }, function (err, user) {
                if (err) throw (err);
                if (!err && user != null) return done(null, user);

                // Al igual que antes, si el usuario ya existe lo devuelve
                // y si no, lo crea y salva en la base de datos
                var user = new User({
                    provider_id: profile.id,
                    provider: profile.provider,
                    name: profile.displayName,
                    photo: profile.photos[0].value
                });
                user.save(function (err) {
                    if (err) throw err;
                    done(null, user);
                });
            });
        }));
    */
};