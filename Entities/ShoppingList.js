class ShoppingList {
    constructor(products) {
        this._id = 0
        this._products = products || []
    }

    set Id(value) {
        this._id = value
    }

    get Id() {
        return this._id
    }

    get TotalPrice() {
        if (!this._products) {
            return 0
        }

        return this._products.reduce((acc, el) => acc + el.price, 0)
    }

   
    get Products() {
        return this._products
    }
}

module.exports = ShoppingList