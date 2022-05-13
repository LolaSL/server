const Productmodel = require('../models/ProductModel');
const productRouter = require('express').Router();
const pool = require('../DB/db')
const productInstance = new Productmodel();

productRouter.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const results = await pool.query("INSERT INTO products (id,  name, author, price, description, category, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
            [req.body.id, req.body.name, req.body.author, req.body.price, req.body.description, req.body.category, req.body.image_url, req.body.status])
        console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                product: results.rows[0]
            }
        });
    }
    catch (err) {
        console.log(err.message);
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
//update products
productRouter.put('/products/:id', async (req, res) => {
    try {
        const results = await pool.query(`UPDATE products SET name=$2, author=$3, price=$4, description=$5, category=$6, image_url=$7, status=$8
        WHERE id = $1 RETURNING *`, [req.body.id, req.body.name, req.body.author, req.body.price, req.body.description, req.body.category,
        req.body.image_url, req.body.status]);
        res.status(200).json({
            status: "success",
            data: {
                product: results.rows[0]
            }
        })
    }
    catch (err) { console.log(err.message); }

    console.log(req.params.id);
    console.log(req.body);

})

//delete product
productRouter.delete("/:id", async (req, res) => {

    try {
        let id = req.params.id;
        const product = await productInstance.deleteProductById(id);

        res.status(204).json({
            status: "success",
        })
    } catch (err) {
        res.status(400).send(err);
    }

})

module.exports = productRouter;