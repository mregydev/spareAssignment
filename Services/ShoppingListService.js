const { Router } = require('express')

const wagner = require('wagner-core')

const messages = require('../Messages')

const Product = require('../Entities/Product')

const shoppingListRouter = Router()

wagner.invoke((ProductDAL, ShoppingListDAL) => {


    shoppingListRouter.post('/AddShoppingList', (req, res) => {

        let productId = req.body.productId

        if (!productId) {
            res.sendValidationError([messages.ProductIdRequired])
        }

        else if (!ProductDAL.ExistProduct(productId)) {
            res.sendNotFoundError(messages.ProductNotExist)
        }
        else {
            //Add product to shopping list
            let shoppingListId = ShoppingListDAL.AddShoppingList(productId)

            //Decrement product quantity
            ProductDAL.DecrementQuantity(productId)

            res.sendSuccess(shoppingListId.toString())
        }
    })


    
    shoppingListRouter.post('/AddItemToShoppingList', (req, res) => {

        let shoppingListId = req.body.shoppingListId

        let productId = req.body.productId


        if (!productId) {
            res.sendValidationError([messages.ProductIdRequired])
        }
        else if (!shoppingListId) {
            res.sendValidationError([messages.ShoppingListIdRequired])
        }
        else if (!ProductDAL.ExistProduct(productId)) {
            res.sendNotFoundError(messages.ProductNotExist)
        }
        else {

            //Adds Item to the shopping list
            ShoppingListDAL.AddProductToShoppingList(shoppingListId,productId)

            //Decrement product quantity after being added to the shopping list
            ProductDAL.DecrementQuantity(productId)

            res.sendSuccess()
        }
    })

    shoppingListRouter.delete('/RemoveItemFromShoppingList', (req, res) => {

        let shoppingListId = req.body.shoppingListId

        let productId=req.body.productId


        if (!shoppingListId) {
            res.sendValidationError([messages.ShoppingListIdRequired])
        }
        else {
            
            //Remove product froom the shopping list
            ShoppingListDAL.RemoveProductFromShoppingList(shoppingListId,productId)
            
            //Increment quantity of the product after being removed from  the shopping list
            ProductDAL.IncrementQuantity(productId)

            res.sendSuccess()
        }
    })

    shoppingListRouter.get('/shoppingLists',(req,res)=>{
        
        let shoppingLists=ShoppingListDAL.ShoppingLists

        //Calculate sum for each products list which is the sum of products prices inside each list
        shoppingLists.map(e=>{
            e.sum=e.Products.reduce((acc,p)=>acc+ProductDAL.FetchProduct(p).Price,0)
        })

        res.sendSuccess(shoppingLists)
    })

    module.exports = shoppingListRouter
})