require('dotenv').config();
require('crypto').randomBytes(64).toString('hex');
const userRouter = require('express').Router();
const { validate, ValidationError } = require('express-validation');
const UserModel = require('../models/UserModel');
const { updateSchema } = require('../func_schemas/validateSchemas');
const { hashPassword } = require('../func_schemas/validateFunction');
const { checkAuthentication } = require('./');




const userInstance = new UserModel();
// Input validation
userRouter.use('/', validate(updateSchema), (err, req, res, next) => {
    if (err instanceof ValidationError) return res.status(err.statusCode).json(err);
    next();
})


userRouter.get('/', checkAuthentication, async (req, res) => {
    try {
        const users = await userInstance.getAllUsers()
        res.json({ users });
    } catch (err) {
        res.status(400).send(err);
    }
})

//New user instance
userRouter.get('/:id', checkAuthentication, async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userInstance.getById(id);
        if (!user) return res.status(404).send("User doesn't exist")
        req.params.user = user;
        return res.status(200).json(user);
    } catch (err) {
        res.status(400).send(err);
    }

});

userRouter.put('/:id', checkAuthentication, async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    for (const key in data) {
        try {
            let input = { column: key, value: data[key], email: req.user.email };
            if (req.params.id === req.user.id) {
                let hashedPassword = await hashPassword(input.value);
                input.value = hashedPassword;
                await userInstance.updateUserByEmail(input);

            } res.status(200).json({ id, data });

        } catch (err) {
            res.status(400).send(err);
        }
    }
    // res.send('Update successful');   

});

//Delete user
userRouter.delete('/:id', checkAuthentication, async (req, res) => {
    try {
        await userInstance.deleteByEmail(req.user.email);
        res.status(200).send({ message: "User deleted Successfully!" });
    } catch (err) {
        res.status(400).send(err)
    }

});

module.exports = userRouter;
