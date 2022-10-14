"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    override: true
  });
}

var express = require('express');

var helmet = require("helmet");

var bodyParser = require('body-parser');

var cors = require('cors');

var swaggerUi = require('swagger-ui-express');

var swaggerLog = require('./swaggerLog.json');

var cookieParser = require('cookie-parser');

var session = require('cookie-session');

var passport = require('passport');

var flash = require('express-flash');

var authRouter = require('./routes/authRouter');

var userRouter = require('./routes/userRouter');

var productRouter = require('./routes/productRouter');

var cartRouter = require('./routes/cartRouter');

var orderRouter = require('./routes/orderRouter');

var _require = require('./config/passportConfig'),
    loadPassport = _require.loadPassport;

var stripe = require('./routes/stripe');

var logger = require('morgan');

var TWO_HOURS = 60 * 60 * 1000 * 13;
var PORT = process.env.PORT || 8080;

var methodOverride = require('method-override');

var app = express(); // This will set express to render views folder, then to render the files as normal html
// app.use(express.static('views'));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.use(helmet());
app.use(flash());
app.use(express.json({
  verify: function verify(req, res, buf) {
    req.rawBody = buf;
  }
}));
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: true
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
    maxAge: TWO_HOURS
  }
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET)); //Passport Middleware

app.use(passport.initialize());
app.use(passport.session());
loadPassport(passport); //Routes
// app.get('/', stripe, (req, res) => {
//     let username = req.cookies.username;
//     res.render('index', {
//         username
//     })
// })

var options = {
  swaggerOptions: {
    validatorUrl: null,
    url: "http://localhost:8000/api-docs/#"
  }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerLog, options));
app.use('/api', authRouter);
app.use('/api/users/', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/stripe', stripe); //Stripe payment

app.get('/', function (req, res) {
  res.redirect('/api-docs');
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  });
  next();
});
app.listen(PORT, function () {
  console.log("Server is listening on http://localhost:".concat(PORT));
});