//libs
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require("mongoose");
const server = require('../../server');
const jwt = require('jsonwebtoken')

//models
let User = require("../models/user");
let Contact = require("../models/contact");
let userBody = {
    email: 'tester@yahoo.com',
    password: 'tester123'
}
let user_id
let tokenRegister
let tokenLogin
let contact_id


chai.use(chaiHttp);

describe('Phone Book API', function() {
    before(function(done) {
        User.findOneAndDelete({email : 'tester@yahoo.com'}, (err , user) => {
         done();
        })
    });
    it('Should Register user', function(done) {
        chai.request(server)

            // register request
            .post('/api/v1/user/register')
            .send(userBody
            ).end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.have.property('token');
                tokenRegister = res.body.data.token
            done();

        })
    })
    it('Should Login User ', function(done) {

                chai.request(server)
                    .post('/api/v1/user/login')
                    .send(userBody)
                    .end((err, res) => {
                        res.body.data.should.have.property('token');
                        tokenLogin = res.body.data.token
                        done();
                    })
    })
    it('Check Register Token', function(done) {
        jwt.verify(tokenRegister , config.secret , (err, decode) => {
            if (!err) {
                user_id = decode.user_id
                done();
            } else {
                throw err
            }
        })

    })
    it('Check Login Token', function(done) {
        jwt.verify(tokenLogin , config.secret , (err, decode) => {
            if (!err) {
                done();
            } else {
                throw err
            }

        })

    })
    it('Create New Contact', function(done) {
                chai.request(server)
                    .post('/api/v1/contact/new')
                    .set('x-auth-token', tokenRegister)
                    .send({
                        name : 'tester',
                        user: user_id,
                        phoneNumbers: [{
                            type : "home" ,
                            number : "09121019898"
                        }],
                        emailAddress : "mahdimirmahdi@yahoo.com",
                        mailingAddress : "mahdimirmahdiJazzzi@gmail.com"
                    })
                    .end((err, res) => {
                        res.body.success.should.equal(true);
                        res.should.have.status(200);
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('name');
                        res.body.data.should.have.property('user');
                        res.body.data.should.have.property('phoneNumbers');
                        res.body.data.should.have.property('createdAt');
                        contact_id = res.body.data._id
                        done();
                    })
    })
    it('Get Contact List', function(done) {
        chai.request(server)
            .get('/api/v1/contact/getList?limit=5&page=1&name=1&createAt=1')
            .set('x-auth-token', tokenRegister)
            .end((err, res) => {
                res.body.success.should.equal(true);
                res.should.have.status(200);
                done();
            })
    })
    it('Edit Contact ', function(done) {
        chai.request(server)
            .put(`/api/v1/contact/edit/${contact_id}`)
            .set('x-auth-token', tokenRegister)
            .send({
                emailAddress : "mahdi2@yahoo.com",
                mailingAddress : "mahdi123@yahoo.com",
                name : "ali",
                phoneNumbers: [
                    {
                        type: "office",
                        number: "09121019898"
                    } ,
                    {
                        type: "home",
                        number: "09121019898"
                    }
                ]
            })
            .end((err, res) => {
                res.body.success.should.equal(true);
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('user');
                res.body.data.should.have.property('phoneNumbers');
                res.body.data.should.have.property('createdAt');
                res.should.have.status(200);
                done();
            })
    })
    it('Delete Contact ', function(done) {
        chai.request(server)
            .delete(`/api/v1/contact/remove/${contact_id}`)
            .set('x-auth-token', tokenRegister)
            .end((err, res) => {
                res.body.success.should.equal(true);
                res.should.have.status(200);
                done();
            })
    })

})

