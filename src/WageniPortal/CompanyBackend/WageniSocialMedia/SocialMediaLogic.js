require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LoginDatabase = require("../WageniDatabase/PrincipalDatabase/MainDatabase");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_DETAILS,
    callbackURL: process.env.GOOGLE_URL_CALLBACK_DETAILS
}, 
function(accessToken, refreshToken, profile, cb) {

    const issuer = "google";  

    LoginDatabase.get(
        'SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?',
        [issuer, profile.id],
        function(err, row) {
            if (err) return cb(err);

            if (!row) {
                LoginDatabase.run(
                    'INSERT INTO users (name) VALUES (?)',
                    [profile.displayName],
                    function(err) {
                        if (err) return cb(err);

                        const id = this.lastID;

                        LoginDatabase.run(
                            'INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)',
                            [id, issuer, profile.id],
                            function(err) {
                                if (err) return cb(err);

                                const user = {
                                    id,
                                    name: profile.displayName
                                };

                                return cb(null, user);
                            }
                        );
                    }
                );
            } else {
                LoginDatabase.get(
                    'SELECT * FROM users WHERE id = ?',
                    [row.user_id],
                    function(err, userRow) {
                        if (err) return cb(err);
                        if (!userRow) return cb(null, false);
                        return cb(null, userRow);
                    }
                );
            }
        }
    );
}));


passport.serializeUser(function(user, cb) {
    cb(null, {
        id: user.id,
        name: user.name
    });
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});