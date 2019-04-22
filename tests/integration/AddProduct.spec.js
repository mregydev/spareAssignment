const request = require('supertest');
const express = require('express');

const should = require('chai').should()

const app = express();

require('../../bootstrap')()

app.use(require('../../CustomReponseMiddleware'))
app.use(require('body-parser').json())
app.use(require('../../Services/ProductService'))


describe('AddProduct test cases', () => {

    it('should add product in normal case', (done) => {

        request(app)
            .post('/AddProduct')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ Name: "ball", Price: 30, Quantity: 12 }))
            .expect(200)
            .end(function (err, res) {
                res.text.should.equal('1')
                done()
            });
    })
})
