const express = require('express');
const router = express.Router();
const { Product } = require('../models');

module.exports = router;

    router.get('/', async (req, res) => {
        try {
            const products = await Product.findAll();
            res.json(products);

        } catch (err) {

            res.status(500).json({ error: err.message });
        }

    });
  
  // Contoh endpoint untuk mendapatkan produk berdasarkan ID
    router.get('/:id', async (req, res) => {

        try {
            const product = await Product.findByPk(req.params.id);
            if (product) {
            res.json(product);

            } else {

                res.status(404).json({ error: 'Product not found' });
            }

            } catch (err) {

                res.status(500).json({ error: err.message });
                
            }
    });

    // create new users
    router.post('/', async (req, res) =>{

        try{

            const newProduct = await Product.create(req.body);
            res.status(201).json(newProduct);

        } catch (e) {

            res.status(500).json({error: err.message});

        }

    });

    // Update Users
    router.put('/:id', async (req, res) => {

        try{

            const [Updated] = await Product.Update(req.body, {
                where: { id: req.params.id }

            });

            if(Updated) {

                const updateProduct = await Product.findByPk(req.params.id);
                res.status(200).json(updateProduct);

            }else {

                res.status(400).json({ error: 'User not found'});

            }

        } catch (e) {

            res.status(500).json({ error: err.message});

        }

    });

    // Delete user 
    router.delete('/id', async(req, res) =>{

        try{

            const deleted = await Product.destory({
                where: { id: req.params.id }

            });

            if (deleted) {

                res.status(204).send();

            } else {

                res.status(404).json({ error: 'User not found' });

            }
        
        } catch (e) {

            res.status(500).json({ error: err.message});

        }

    });


