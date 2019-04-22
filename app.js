const app=require('express')()

const bodyParser=require('body-parser')

//bootstrap is used for registering our dependcies with wagner-core
require('./bootstrap')()

const productsRouter=require('./Services/ProductService')

const shoppingListRouter=require('./Services/ShoppingListService')

//our custom miiddle ware for handling responses
app.use(require('./CustomReponseMiddleware'))

app.use(bodyParser.json())

app.use(productsRouter)

app.use(shoppingListRouter)

app.listen(8080)


