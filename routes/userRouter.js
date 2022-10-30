require('dotenv').config();
const jwt = require('jsonwebtoken');
require('crypto').randomBytes(64).toString('hex');
const userRouter = require('express').Router();
const { validate, ValidationError } = require('express-validation');
const UserModel = require('../models/UserModel');
const { updateSchema } = require('../func_schemas/validateSchemas');
const { hashPassword } = require('../func_schemas/validateFunction');
const { checkAuthentication } = require('../config/passportConfig');
// const { ensureToken } = require('../utils/ensureToken');
secretKey = process.env.JWT_SECRET;

const userInstance = new UserModel();
// Input validation
userRouter.use('/', validate(updateSchema), (err, req, res, next) => {
    if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
})


userRouter.get('/',
    //   ensureToken,
    checkAuthentication, async (req, res) => {

        try {
            const users = await userInstance.getAllUsers()

            res.json({ users });

        } catch (err) {
            res.status(400).send(err);
        }
    })

userRouter.get('/:id', checkAuthentication, async (req, res,) => {
    const { id } = req.user;
    const user = await userInstance.getById(id);
    if (user) {
        return res.status(200).json(user);
    }
    const decoded = jwt.verify(req.token, secretKey, function (req, res, next) {
        console.log(decoded);
        try {
            req.user = decoded;
            req.header = userInstance.getById(decoded.id).select('password');
            if (decoded) {
                return res.status(200).json(req.user)
                next()
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }
    )
});

// // User Routes
// userRouter.get('/:id',   checkAuthentication,  async (req, res, next) => {

// })

//New user instance
userRouter.put('/:id', checkAuthentication, async (req, res) => {
    const data = req.email;
    for (const key in data) {
        try {
            let input = { column: key, value: data[key], email: req.user.email };
            if (key === 'password') {
                let hashedPassword = await hashPassword(input.value);
                input.value = hashedPassword;
                await userInstance.updateUserByEmail(req.user.email);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }
    res.status(200).send({ message: "User updated Successfully!" });
});

//Delete user
userRouter.delete('/:id', checkAuthentication, async (req, res) => {
    try {
        await userInstance.deleteByEmail(req.user.email);
        res.status(200).send({ message: "User deleted Successfully!" });
    } catch (err) {
        res.status(403).send(err)
    }

});

module.exports = userRouter;
