const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { getUser, createUser, deleteUser } = require('../models/user');
const keys = require('../config/keys');

passport.serializeUser((user,done) => {
    done(null, user.googleid);
});

passport.deserializeUser((id, done) => {
    getUser(id).then(user =>{
        done(null, user[0]);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.clientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await getUser(profile.id);
        if (existingUser) {
            done(null, existingUser);
        } else {
            const googleid = profile.id
            const name = profile.displayName;
            createUser(googleid, name);
            done(null, result);
        }

        }
    
    )
)
