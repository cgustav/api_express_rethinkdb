let {
    user
} = require('../api/models/index');
const bcrypt = require('bcryptjs')
// Estrategia de autenticación con Twitter
//const TwitterStrategy = require('passport-twitter').Strategy;
// Estrategia de autenticación con Facebook
//const FacebookStrategy = require('passport-facebook').Strategy;

const LocalStrategy = require('passport-local').Strategy

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.
module.exports = function (passport) {

    // Serializa al usuario para almacenarlo en la sesión
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // Deserializa el objeto usuario almacenado en la sesión para
    // poder utilizarlo
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });


    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                let match
                let data = await user.getUserByUsername(username)

                if (data) match = await bcrypt.compare(password, data.auth.password)
                if (match) return done(null, data)

                return done(null, false)
            } catch (error) {
                console.log('cannot authenticate :  ', err)
                return done(err)
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