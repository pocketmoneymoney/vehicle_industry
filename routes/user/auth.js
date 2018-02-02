'use strict';

var log4js = require('log4js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var logger = log4js.getLogger('server');


passport.use('login.admin', new LocalStrategy({
    passReqToCallback: true  
}, function (req, username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        };

        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        req.session.regenerate(function(err) {
            req.session.user = user;
        });

        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});





