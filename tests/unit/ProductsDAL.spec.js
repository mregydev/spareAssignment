const ProductDAL = require('../../DAL/ProductsDAL')
const Product = require('../../Entities/Product')

const should = require('chai').should()

describe('ProductDAL test cases', () => {

    let productDAL, testProduct;

    before(() => {
        productDAL = new ProductDAL()

        testProduct = new Product()
        testProduct.Price = 12
        testProduct.Name = 'ball'
        testProduct.Quantity = 3

    })

    describe('Add Product test cases', () => {

        it('should add product to inner products list in normal case', (done) => {

            let res = productDAL.AddProduct(testProduct)

            res.should.equals(1)

            productDAL.Products.length.should.equals(1)

            done()
        })
    })

    describe('ExistProduct test cases', () => {

        it('should return true in case product exist with amount greater than zero', (done) => {

            let res = productDAL.ExistProduct(1)

            res.should.be.true

            done()
        })

        it('should return false in case product not exist', (done) => {

            let res = productDAL.ExistProduct(3)

            res.should.be.false

            done()
        })
    })
})