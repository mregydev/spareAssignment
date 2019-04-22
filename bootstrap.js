const wagnerCore = require('wagner-core')

const ProductDAL = require('./DAL/ProductsDAL')

const ShoppingListDAL = require('./DAL/ShoppingListDAL')


module.exports = () => {

    wagnerCore.factory('ProductDAL', () => new ProductDAL())

    wagnerCore.factory('ShoppingListDAL', () => new ShoppingListDAL())
}


