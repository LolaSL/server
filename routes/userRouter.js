require('dotenv').config()
const jwt = require('jsonwebtoken');
require('crypto').randomBytes(64).toString('hex');
const userRouter = require('express').Router();
const { validate, ValidationError } = require('express-validation');
const UserModel = require('../models/UserModel');
const { updateSchema } = require('../func_schemas/validateSchemas');
const { hashPassword } = require('../func_schemas/validateFunction');
const { checkAuthentication } = require('../config/passportConfig');
const { ensureToken } = require('../utils/ensureToken')
const userInstance = new UserModel();
const secretKey = process.env.JWT_SECRET;


// Input validation
userRouter.use('/', validate(updateSchema), (err, req, res, next) => {
    if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
})

// User Routes
userRouter.get('/', ensureToken, checkAuthentication, (req, res) => {

   
  jwt.verify(req.token, secretKey, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                data: data,

            })
        }
    }
    )
})
      

//New user instance
userRouter.post('/', checkAuthentication, async (req, res) => {
    const data = req.body;
    for (const key in data) {
        try {
            let input = { column: key, value: data[key], email: req.user.email };
            if (key === 'password') {
                let hashedPassword = await hashPassword(input.value);
                input.value = hashedPassword;
            }
            await userInstance.updateUser(input);
        
        } catch (err) {
            res.status(400).send(err);
        }
    }
    res.send('Update is successful');
});

//Update user
userRouter.put('/', checkAuthentication, async (req, res) => {
    try {
        data = req.body
        res.status(200).json(data.first_name || data.email )
    } catch (err) {
        res.status(400).send(err);
    }
});


//Delete user
userRouter.delete('/', checkAuthentication, async (req, res) => {
    try {
        await userInstance.deleteByEmail(req.user.email);

    } catch (err) {
        res.status(400).send(err)
    }
    res.status(204).send();
});

module.exports = userRouter;
