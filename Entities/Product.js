class Product {
    constructor() {
        this._id = 0
        this._name = ""
        this._price = 0
        this._quantity = 0
    }

    set Id(value) {
        this._id = value
    }

    get Id() {
        return this._id
    }


    set Name(value) {
        this._name = value
    }

    get Name() {
        return this._name
    }


    set Price(value) {
        this._price = value
    }

    get Price() {
        return this._price
    }


    set Quantity(value) {
        this._quantity = value>0?value:0
    }

    get Quantity() {
        return this._quantity
    }

    static IsValid(product) {
        return product.Price && product.Quantity && product.Name
    }
}

module.exports = Product