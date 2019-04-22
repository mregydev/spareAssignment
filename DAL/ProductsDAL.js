const Product = require('../Entities/Product')

class ProductsDAL {
    constructor() {
        this._products = []
    }

    /**
    * @param  {number} productId
    * Decremements the quantity for the given product Id
    */
    DecrementQuantity(productId) {
        let selectedProductIndex = this._products.findIndex(p => p.Id === productId)

        if (selectedProductIndex === -1) {
            return false
        }

        this._products[selectedProductIndex].Quantity--

        return true
    }



    /**
    * @param  {number} productId
    * Incremements the quantity for the given product Id
    */
    IncrementQuantity(productId) {

        let selectedProductIndex = this._products.findIndex(p => p.Id === productId)

        if (selectedProductIndex === -1) {
            return false
        }

        this._products[selectedProductIndex].Quantity++

        return true
    }



    /**
    * @param  {number} productId
    * Determine whether product exist in the list of available products and also has quantity greater then zero
    * @returns {Boolean}
    */
    ExistProduct(productId) {
        return this._products.filter(p => p.Id === productId && p.Quantity > 0).length
    }


    /**
    * @param  {Product} product
    * @returns {Number} productId
    */
    AddProduct(product) {
        product.Id = this._products.length + 1

        this._products.push(product)

        return product.Id

    }

    
    /**
    * @param  {number} productId
    * @returns {Product}
    */
    FetchProduct(productId) {
        return this._products.filter(p => p.Id === productId)[0]
    }


    /**
    * @param  {number} productId
    * @returns {number}
    * Determine index of passed productId in the list of products
    */
    GetProductIndex(productId) {
        return this._products.findIndex(p => p.Id === productId)
    }


    /**
    * @param  {number} productIndex
    * @returns {Boolean}
    */
    DeleteProduct(productIndex) {
        this._products.splice(productIndex, 1)
        return true
    }


    /**
    * @param  {number} productIndex
    * @param  {Product} newProduct
    * @returns {Boolean}
    */
    UpdateProduct(productIndex, newProduct) {
        this._products[productIndex] = { ...newProduct }

        return true
    }

    

    /**
    * 
    * @returns {List<Product>}
    */
    get Products() {
        return this._products
    }


}

module.exports = ProductsDAL