const passport = require('passport')

const policy = {
    //Apply passport any strategy
    apply: function (strategyName) {
        return passport.authenticate(strategyName)
    },
    //Setup handler for selected strategy
    handler: function (strategyName, failureRedirect) {
        return passport.authenticate(strategyName, {
            failureRedirect // : failureRedirect
        })
    },
    //Calllback strategy
    callback: function (successRedirect) {
        return function (req, res) {
            //console.log('[log] USER LOGGING: ', req.body.username)
            res.redirect(successRedirect)
        }
    },

    //For more complex passport auth algorithm
    complexHandler: function (strategyName, failureRedirect, successRedirect) {
        return passport.authenticate(strategyName, {
            failureRedirect,
            successRedirect,
            failureFlash: true
        })

    }


}



module.exports = policy