if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerLog = require('./swaggerLog.json');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const { loadPassport } = require('./config/passportConfig');
const processPayment = require('./func_schemas/paymentFunction');
const logger = require('morgan');

const port = process.env.port || 8080;

const app = express();
// This will set express to render views folder, then to render the files as normal html
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(flash());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: process.env.URL || '*',
}));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? "true" : "auto",
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
    },

}));
console.log(session)
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
loadPassport(passport);
//Routes
app.get('/', processPayment, (req, res) => {
    res.render('index')
})
// app.get('/', (req, res) => {
//     res.redirect('/api-docs');
// })
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerLog));
app.use('/api', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.post('/api/create-checkout-session', processPayment)//Stripe payment


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
