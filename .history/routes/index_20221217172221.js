
const router = require("express").Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');
const swaggerUi = require("swagger-ui-express");
const s

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerLog, options));
router.use('/api', authRouter);
router.use('/api/users', userRouter);
router.use('/api/products', productRouter);
router.use('/api/carts', cartRouter);
router.use('/api/orders', orderRouter);
module.exports = router;