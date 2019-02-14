const passport = require('passport')

const policy = {
    //Apply passport strategy
    apply: function (strategyName) {
        return passport.authenticate(strategyName)
    },
    //Setup handler strategy
    handler: function (strategyName, failureRedirect) {
        return passport.authenticate(strategyName, {
            failureRedirect: failureRedirect
        })
    },
    //Calllback strategy
    callback: function (successRedirect) {
        return function (req, res) {
            //console.log('[log] USER LOGGING: ', req.body.username)
            res.redirect(successRedirect)
        }
    },
    complexHandler: async (handlerName, failureRedirect, successRedirect) => {
        passport.authenticate(handlerName, {
                failureRedirect: failureRedirect
            }),
            function (req, res) {
                console('[log] ', req.username, 'logging in ')
                res.redirect(successRedirect);
            }
    }
}

const policy_util = function (req, res) {
    res.redirect('/sucess')
}

module.exports = {
    policy,
    policy_util
}