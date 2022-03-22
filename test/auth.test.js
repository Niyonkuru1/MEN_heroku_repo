process.env.NODE_ENV = "test";

import Userdb from "../server/model/authModel";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);


before((done) => {
    Userdb.deleteMany({}, function (err) {
        // console.log(`There is a broblem in cleaning the blogDB before starting to post ${err}`);
    });
    done();
})

after((done) => {
    // Userdb.deleteMany({}, function (err) {
    // });
    done();
})

describe('/auth/sign TEST on the bloges_DB Collection', () => {

    it("Should create a valid user into the databse", (done) => {
        let newUser = {
            email: "sylvainniyonkuru23@gmail.com",
            password: "test123"
        }
        chai.request(app)
            .post("/auth/signup")
            .send(newUser)
            .end((err, res) => {
                let users = res.body;
                res.should.have.status(201);
                // expect(users).to.be.an('array');
                expect(users).to.be.an('object');
                expect(users).to.have.all.keys('userCred', 'token');
                expect(users.userCred).to.have.all.keys('email');
                expect(users.token, users.userCred.email, users.userCred.password).to.be.a('string');
                // console.log(users.userCred.email);
                done();
            })
    })

    it("Should login the user with the password and email", (done) => {
        let User = {
            email: "sylvainniyonkuru23@gmail.com",
            password: "test123"
        }
        chai.request(app)
            .post("/auth/login")
            .send(User)
            .end((err, res) => {
                let users = res.body;
                res.should.have.status(200);
                expect(users).to.be.an('object');
                expect(users).to.have.all.keys('userCred', 'token');
                expect(users.userCred).to.have.all.keys('email', "message");
                expect(users.token, users.userCred.email,
                    users.userCred.password, users.userCred.status, users.userCred.message).to.be.a('string');
                // console.log(users.userCred.email,users.userCred.message);
                done();
            })
    })

    it("It should now get all users [in my case 1 user] with using the token obtained after logging in", (done) => {
        const tokeni = {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzgzYjFlZmY0MzQwNjM0NGFmZWQ3NCIsImlhdCI6MTY0Nzg3MDkwNCwiZXhwIjoxNjQ4MTMwMTA0fQ.tonlBq0uWzaVhpOR-gUuH1dkMISTZgSrlZ6QzctXTIo'
        }
        chai.request(app)
            .get("/auth/all-users")
            // .send("Authorization", tokeni.token)
            .end((err, res) => {
                let users = res.body;
                res.should.have.status(202);
                expect(users).to.be.an('array');
                expect(users[0]).to.be.an('object');
                expect(users[0]).to.have.all.keys('email', 'password', "_id", "__v");
                expect(users[0].password, users[0].email).to.be.a('string');

                // console.log(users[0].email, users[0]._id);
                done();
            })
    })


    it("Should successfully logout the user with get request", (done) => {
        chai.request(app)
            .put("/auth/logout")
            .end((err, res) => {
                let users = res.body;
                res.should.have.status(202);
                // expect(users).to.be.an('array');
                expect(users).to.be.an('object');
                expect(users).to.have.all.keys('msg');
                expect(users.msg).to.be.a('string');
                expect(users.msg).to.be.equal("You have been Logged Out");
                // console.log(users.message);
                done();
            })
    })
})


describe('AUTHENTICATION/  testing protected routes', function () {
    it('Should not register the user twice', function (done) {
        let newUser = {
            email: "sylvainniyonkuru23@gmail.com",
            password: "test123"
        }
        chai.request(app)
            // register request
            .post('/auth/signup')
            .send(newUser
            )
            .end((err, res) => { // when we get a resonse from the endpoint
                res.should.have.status(400);
                res.body.message.should.be.equal("The user already exists");
                done();
            });
    })
it('Should not allow one to register password < 6 character', function (done) {
            let newUser = {
                email: "sylvainniyonkuru23@gmail.com",
                password: "tet12"
            }
            chai.request(app)
                // register request
                .post('/auth/signup')
                .send(newUser
                )
                .end((err, res) => { // when we get a resonse from the endpoint
                    res.should.have.status(400);
                    res.body.message.should.be.equal("Enter minimum 6 character of password");
                    done();
                });
        })
    })


