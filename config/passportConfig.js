const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usermodel = require('../models/UserModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const userInstance = new Usermodel();

const loadPassport = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {

            const user_role = "customer";
            const user = await userInstance.getByEmail(email, user_role);

            if (!user) return done(null, false);
            if (! await bcrypt.compare(password, user.password)) return done(null, false);
            user.password = '******';
            return done(null, user);
        } catch (err) {
            return done(err)
        }
    }));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await userInstance.getById(id);
        user.password = '******';
        return done(null, user);
    })
}

const checkAuthentication = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) return next();
    res.status(400).json({ message: 'Please login' });
}
//Checks the A_JWT cookie
passport.use(
    'jwt-customer',
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromExtractors([
                (req) => {
                    let token = null;
                    if (req && req.cookies) {
                        token = req.cookies['A_JWT']
                    }
                    return token;
                }])
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
//Checks the A_JWT cookie and if a user has user_role = admin
passport.use(
    'jwt-admin',
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromExtractors([
                (req) => {
                    let token = null;
                    if (req && req.cookies) {
                        token = req.cookies['A_JWT']
                    }
                    return token;
                }])
        },
        async (token, done) => {
            if (token.user.role !== 'admin') { //Reject if not admin
                return done(null, false)
            }
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
module.exports = { loadPassport, checkAuthentication };