let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../../src/index').startServer();
let loginStubs = require('../resources/LoginApiStubs');

chai.use(chaiHttp);

after(() => require('../../src/index').stopServer());

describe('Start Login API test', () => {
               it('#1 should login the user', (done) => {
                              chai.request(server)
                                             .post('/employee/register')
                                             .send(loginStubs.loginSuccess)
                                             .end((err, res) => {
                                                            res.should.have.status(200);
                                                            res.body.should.be.a('object');
                                                            done();
                                             });
               });
               it('#2 should not login the user as no password provided', (done) => {
                              chai.request(server)
                                             .post('/employee/register')
                                             .send(loginStubs.incorrectPassword)
                                             .end((err, res) => {
                                                            res.should.have.status(400);
                                                            res.body.should.be.a('object');
                                                            done();
                                             });
               });
               it('#3 should not login as password should not have minimum length', (done) => {
                              chai.request(server)
                                             .post('/employee/register')
                                             .send(loginStubs)
                                             .end((err, res) => {
                                                            res.should.have.status(400);
                                                            res.body.should.be.a('object');
                                                            done();
                                             });
               });
});