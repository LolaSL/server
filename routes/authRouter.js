
const dotenv = require('dotenv');
dotenv.config();
require('crypto').randomBytes(64).toString('hex')
const jwt = require('jsonwebtoken');
const Usermodel = require('../models/UserModel');
const { registerSchema, loginSchema } = require('../func_schemas/validateSchemas');
const { hashPassword } = require('../func_schemas/validateFunction');
const { validate, ValidationError } = require('express-validation');
const passport = require('passport');
const userInstance = new Usermodel();
const authRouter = require('express').Router();


//Autherization Routes
authRouter.post('/register', validate(registerSchema), async (req, res) => {
    if (req.user) return res.status(400).json({ message: 'Please log out to create a new user.' });
    let data = req.body;
    //Check if email exists   
    let userCheck = await userInstance.getByEmail(data.email);
    if (userCheck) {
        return res.status(400).send('Email already in use');
    }

    //Hash password
    const bcryptPassword = await hashPassword(data.password);
    data.password = bcryptPassword;

    //Create new user
    try {
        await userInstance.create(data);
        res.status(201).send('User created')
    } catch (err) {
        res.status(400).send(err);
    }

});
//login Route
authRouter.post('/login', validate(loginSchema),  passport.authenticate('local', { failureFlash: true }), (req, res) => {
    const user = req.user;
    const token = jwt.sign(user, process.env.TOKEN_SECRET,  {algorithm: 'HS256'}, { expiresIn: '1800s' })
    res.json({ token: token , message: `${user.first_name} is logged in` });

});

//Logout Route
authRouter.get('/logout', (req, res) => {

    req.logout();
    res.json({ message: 'User logged out' });
})

//Catch validation errors
authRouter.use((err, req, res, next) => {
    if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
});

module.exports = authRouter;