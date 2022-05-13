const Productmodel = require('../models/ProductModel');
const productRouter = require('express').Router();
const pool = require('../DB/db')
const productInstance = new Productmodel();

// productRouter.post('/', async (req, res) => {
//     console.log(req.body);
//     try {
//         const results = await pool.query("INSERT INTO products (id,  name, author, price, description, category, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
//             [req.body.id, req.body.name, req.body.author, req.body.price, req.body.description, req.body.category, req.body.image_url, req.body.status])
//         console.log(results)
//         res.status(201).json({
//             status: "success",
//             data: {
//                 product: results.rows[0]
//             }
//         });
//     }
//     catch (err) {
//         console.log(err.message);
//     }

// })

productRouter.post('/', async (req, res) => {

    try {
        const product = await productInstance.createProducts({});
        console.log(product)
        res.json({ product });
    } catch (err) {
        res.status(400).send(err);
    }
})
//Get all products
productRouter.get('/', async (req, res) => {

    try {
        const productList = await productInstance.getAllProducts();
        console.log(productList)
        res.json({ productList });
    } catch (err) {
        res.status(400).send(err);
    }
})

//Get product by id
productRouter.get('/:id', async (req, res) => {

    let id = req.params.id;

    try {
        const product = await productInstance.getProductById(id);
        if (!product) return res.status(404).send('Invalid product number');
        res.json(product);
    } catch (err) {
        res.status(400).send(err);
    }
})

//Get products by category
productRouter.get('/categories/:category', async (req, res) => {

    let category = req.params.category;

    try {
        const productList = await productInstance.getProductsByCategory(category);
        if (productList.length === 0) return res.status(404).send('Invalid category');
        res.json(productList);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = productRouter;