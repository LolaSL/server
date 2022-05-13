const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const session_secret = require('./config/config');
// const { loadPassport } = require('./config/passportConfig');

const port = process.env.port || 8080;



const app = express();
app.use(express.static('public'))
app.use(flash());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: process.env.URL || '*',
}));
app.use(session({
    secret: session_secret,
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? "true" : "auto",
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
    },
    resave: false,
    saveUninitialized: false
}))

app.use(express.urlencoded({ extended: true }));


app.use(cookieParser(session_secret));
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// loadPassport(passport);
app.get('/', function (req, res) {
    res.status(200).send('Server is working')
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
    next();
})
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
