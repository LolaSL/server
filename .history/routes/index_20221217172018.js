
const router = require("express").Router();
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const swaggerUi = require("swagger-ui-express");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerLog, options));
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);