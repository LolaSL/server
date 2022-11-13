require('dotenv').config();
require('crypto').randomBytes(64).toString('hex')
const Usermodel = require('../models/UserModel');
const { registerSchema, loginSchema } = require('../func_schemas/validateSchemas');
const { hashPassword } = require('../func_schemas/validateFunction');
const { validate, ValidationError } = require('express-validation');
const passport = require('passport');
const userInstance = new Usermodel();
const authRouter = require('express').Router();
const { generateAuthToken } = require("../utils/generateAuthToken");


//Autherization Routes
authRouter.post('/register', validate(registerSchema), async (req, res, next) => {
  if (req.user) return res.status(401).json({ message: 'Please log out to create a new user.' });
  const user = req.body;
  //Check if email exists   
  let userCheck = await userInstance.getByEmail( req.body.email);
  if (userCheck) {
    return res.status(400).send('Email already in use');
  }

  //Hash password
  const bcryptPassword = await hashPassword( req.body.password);
  user.password = bcryptPassword;

  //Create new user and token
  try {
    await userInstance.create(user);
    const token = generateAuthToken(user);
    res.status(201).json({ token: token});
  } catch (err) {
    res.status(400).send(err);
    next()
  }

});
//login Route
authRouter.post('/login', validate(loginSchema), passport.authenticate('local', { failureFlash: true }), (req, res) => {
  try {
    const  user  = req.user;
    console.log({ user })
    const token = generateAuthToken(user);
    res.json({  token:token, message: `${user.first_name} is logged in;  ${user.user_role} `, expires_in: '1800s' });
  } catch (err) {
   console.log(err);
  }

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