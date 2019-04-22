const ShoppingList = require('../Entities/ShoppingList')

class ShoppingLisstDAL {
    constructor() {
        this._shoppingLists = []
    }




    /**
    * @param  {Product} newProduct
    * @returns {Number}
    * create new shopping list
    */
    AddShoppingList(product) {

        let shoppiingList = new ShoppingList([product])

        shoppiingList.Id = this._shoppingLists.length+1

        this._shoppingLists.push(shoppiingList)

        return shoppiingList.Id
    }


    /**
    * @param  {number} shoppingListId
    * @param  {number} productId
    * @returns {Boolean}
    */
    AddProductToShoppingList(shoppingListId, productId) {
        let targetShoppingListIndex = this.GetIndex(shoppingListId)

        this._shoppingLists[targetShoppingListIndex].Products.push(productId)

        return true
    }


    

    /**
    * @param  {number} shoppingListId
    * @param  {number} productId
    * @returns {Boolean}
    */
    RemoveProductFromShoppingList(shoppingListId, productId) {
        let targetShoppingListIndex = this.GetIndex(shoppingListId)

        let targetIndex=this._shoppingLists[targetShoppingListIndex].Products.indexOf(productId)

        this._shoppingLists[targetShoppingListIndex].Products.splice(targetIndex,1)

        return true
    }


    /**
    * @param  {number} productId
    * @returns {Boolean}
    * Removes product from all shopping lists
    */
    RemoveProductFromAllList(productId)
    {
        this._shoppingLists.map(e=>this.RemoveProductFromShoppingList(e.Id,productId))
        return true
    }
    

    /**
    * @param  {number} id  -- shoppinglistId
    * @returns {ShoppingList}
    */
    FetchShoppingList(id) {
        return this._shoppingLists.filter(e => e.id === id)
    }


    /**
    * @param  {number} shoppingListId
    * @returns {Number}
    * Return index of given shopping list in shopping lists array
    */
    GetIndex(shoppingListId) {
        return this._shoppingLists.findIndex(s => s.Id === shoppingListId)

    }


    /**
    * @param  {number} itemIndex
    * @returns {Boolean}
    */
    RemoveFromShoppingList(itemIndex) {
        this._shoppingLists.splice(itemIndex, 1)
        return true
    }

    /**
    * @returns {List<ShoppingList>}
    */
    get ShoppingLists() {
        return this._shoppingLists
    }


}

module.exports = ShoppingLisstDAL