const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const pool = require('../models/db');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user =>{
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await pool.query(
            "SELECT FROM users WHERE googleid = $1", [profile.id]);
        
        if(existingUser) {
            done(null, existingUser);
        } else {
            //new model instance
            const googleid = profile.id
            const name = profile.displayName;
            const user = await pool.query(
                "INSERT INTO users (googleid, name) VALUES($1,$2) RETURNING *", [googleid,name]);
            done(null, user);
        }
    }
    )
);
