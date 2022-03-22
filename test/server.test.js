process.env.NODE_ENV = "test";

import Blogdb from "../server/model/model";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

before((done) => {
    Blogdb.deleteMany({}, function (err) { });
    done();
})

after((done) => {
    Blogdb.deleteMany({}, function (err) { });
    done();
})

describe('/api/blogs TEST on the bloges_DB Collection', () => {
    it("It should test if routes and test files are conneected and working", (done) => {
        chai.request(app)
            .get("/api/welcome")
            .end((err, res) => {
                res.should.have.status(302);
                done()
            })
    })
    it("should verify that we have 0 blogs in the DB", (done) => {
        chai.request(app)
            .get("/api/blogs")
            .end((err, res) => {
                let blogData = res.body;
                //using expect
                expect(res).to.have.status(202);
                expect(blogData).to.be.a('array');
                expect(blogData).to.have.lengthOf(0);
                done()
            })
    })

    it("should POST a valid  blogs in the database", (done) => {
        let titleArr = ['one', 'two', 'three'];
        for (let i = 0; i < titleArr.length; i++) {
           let blog = {
                title: titleArr[i] + " last 1234 test of posting the data in database",
                body: titleArr[i] + " USING MOCHA AND CHAI to test the end points",
                author: titleArr[i] + " Hello hellofrom sylvain during testing",
                date: "20/3/2022"
            }
            chai.request(app)
                .post("/api/blogs")
                .send(blog)
                .end((err, res) => {
                    let blogData = res.body;
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    expect(blogData).to.have.all.keys('comments', 'title', 'author', 'body', "__v", "_id", "date");
                    expect(blogData.author, blogData.date, blogData.title, blogData.body).to.be.a('string');
                    expect(blogData.comments).to.be.an("array");
                })
        }
        done();
    })

    it("Should retrieve blogs from database and with id", (done) => {
        let len;
        chai.request(app)
            .get("/api/blogs")
            .end((err, res) => {
                var arrayId = [];
                var blogs = res.body;
                blogs.forEach(element => {
                    arrayId.push(element._id);
                });
                len = blogs.length;
                res.should.have.status(202);
                expect(blogs).to.be.an("array");
                expect(blogs[0]).to.be.an('object');
                expect(len).to.not.be.an('undefined');
                done();
                arrayId.forEach(id => {
                    chai.request(app)

                })
            })
    })
})

describe('/api/blogs/:id  GET', () => {
    it('it should GET a blog by the given id', (done) => {
        let blog = new Blogdb({
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            body: "testing the routes to see if id works",
            date: "3/2/2022"
        });
        blog.save((err, blog) => {
            chai.request(app)
                .get(`/api/blogs/${blog._id}`)
                .end((err, res) => {
                    let bloge = res.body;
                    res.should.have.status(200);
                    expect(bloge).to.be.an('object');
                    expect(bloge).to.have.all.keys('comments', 'title', 'author', 'body', "__v", "_id", "date");
                    expect(bloge.title).to.be.a("string");
                    expect(bloge.title).to.be.equal("The Lord of the Rings");
                    done();
                });
        });

    });
});

describe('/api/blogs PUT', () => {
    it('it should UPDATE a blog given the id', (done) => {
        let blog = new Blogdb({
            title: "The Chronicles of Narnia",
            author: "C.S. Lewis",
            body: "updating the blogs with the provided id",
            date: "1/1/2010"
        })
        blog.save((err, blog) => {
            chai.request(app)
                .put(`/api/blogs/${blog._id}`)
                .send({
                    title: "THE KING OF THE JUNGLE",
                    author: "C.S. Lewis",
                    body: "updating the blogs with the provided id",
                    date: "20/12/2050"
                })
                .end((err, res) => {
                    let data = res.body;
                    res.should.have.status(205);
                    data.should.be.a('object');
                    data.should.have.property('title').eql("THE KING OF THE JUNGLE");
                    data.should.have.property('date').eql("20/12/2050");

                    done();
                });
        });
    });
});

describe('/api/addcom/:id .. PUT', () => {
    it('it should ADD the comment to the blog with the id', (done) => {
        let blog = new Blogdb({
            title: "The king of tyre",
            author: "nkusi ARTHUR",
            body: "the Comment Addition testing",
            date: "12/34/5050"
        })
        blog.save((err, blog) => {
            chai.request(app)
                .put(`/api/blogs/addcom/${blog._id}`)
                .send({
                    newCom: "The comment added specified id"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('comment content created');
                    done();
                });
        });
    });
})

describe('Testing the MIDDLEWARE functionality and delete request', function() {
    it('Should be able to access the protected routes, in my case DELETE route', function(done) {
                // follow up with login
                chai.request(app)
                    .post('/auth/login')
                    // send user login details
                    .send({
                        email: "sylvainniyonkuru23@gmail.com",
                        password: "test123"
                    })
                    .end((err, res) => {
                        res.body.should.have.property('token');
                        var token = res.body.token;
                        // follow up with requesting user protected page
                        chai.request(app)
                            .get('/api/blogs')
                            .end(function(err, res) {
                                chai.request(app)
                                .delete(`/api/blogs/${res.body[0]._id}`)
                                    // we set the auth header with our token
                                    .send({
                                        token:`Bearer ${token}` 
                                    })
                                    .end((error, res)=>{
                                        res.should.have.status(202);
                                        res.body.should.have.property('message');
                                        res.body.message.should.equal('Blogs deleted Successfuly!!');
                                        done();
                                    });
                            })
                    })
            })
    })


