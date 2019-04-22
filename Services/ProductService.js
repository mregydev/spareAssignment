const { Router } = require('express')

const wagner = require('wagner-core')

const messages = require('../Messages')

const { check, validationResult } = require('express-validator/check');

const Product = require('../Entities/Product')

const productsRouter = Router()

wagner.invoke((ProductDAL, ShoppingListDAL) => {

    productsRouter.get('/Products', (req, res) => {
        res.send(ProductDAL.Products)
    })

    productsRouter.post('/AddProduct', (req, res) => {

        let product = req.body

        if (!product || !Product.IsValid(product)) {
            res.sendValidationError([messages.ProductRequired])
        }
        else {
            let productId = ProductDAL.AddProduct(product)
            res.sendSuccess(productId.toString())
        }
    })

    productsRouter.post('/UpdateProduct', (req, res) => {

        let product = req.body

        if (!product || !product.Id || !Product.IsValid(product)) {
            res.sendValidationError([messages.ProductRequired])
        }

        else {

            //first get index of product in the products list
            let targetProductIndex = ProductDAL.GetProductIndex(product.Id)

            if (!targetProductIndex === -1) {
                res.sendNotFoundError(messages.ProductNotExist)
            }
            else {

                //update product with the new value
                ProductDAL.UpdateProduct(targetProductIndex, product)
                res.sendSuccess()
            }

        }
    })

    productsRouter.delete('/DeleteProduct', (req, res) => {

        let productId = req.body.productId

        if (!productId) {
            res.sendValidationError([messages.ProductIdRequired])
        }

        else {

            //get product index
            let targetIndex = ProductDAL.GetProductIndex(productId)

            if (targetIndex === -1) {
                res.sendNotFoundError(messages.ProductNotExist)
            }
            else {
                //remove from products ist
                ProductDAL.DeleteProduct(targetIndex)

                //remove from shopping list
                ShoppingListDAL.RemoveProductFromAllList(productId)
                
                res.sendSuccess()
            }

        }
    })

    module.exports = productsRouter
})