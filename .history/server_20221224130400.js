if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ override: true });
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ override: true });
}
const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const passport = require('passport');
const flash = require('express-flash');
const { loadPassport } = require('./config/passportConfig');
const logger = require('morgan');
const TWO_HOURS = 60 * 60 * 1000 * 13;
const methodOverride = require('method-override');
const router = require("./routes/index");
const PORT = process.env.PORT || 8080;

const app = express();


app.use(helmet());
app.use(flash());
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: true,
}));
app.set("trust proxy", 1);
app.use(methodOverride('_method'));
app.use(session({
    name: process.env.SESS_NAME,
    cookieName: 'session',
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESS_SECRET,
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? "true" : "auto",
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
        maxAge: TWO_HOURS,

    },

}));
// 

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
loadPassport(passport);
//Routes

app.use("/", router);


app.get("/", (req, res) => {

    res.redirect('/api-docs/',
    );
})


app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
    next();
})


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
});


