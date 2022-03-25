// process.env.NODE_ENV = "test";

// import Messagedb from "../server/model/messageModel";
// import chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../server";
// const expect = chai.expect;
// chai.should();
// chai.use(chaiHttp);

// before((done) => {
//     Messagedb.deleteMany({}, function (err) { });
//     done();
// })

// after((done) => {
//     Messagedb.deleteMany({}, function (err) { });
//     done();
// })

// describe('/api/messages TEST on the messagees_DB Collection', () => {
//     it("should verify that we have 0 messages in the DB", (done) => {
//         chai.request(app)
//             .get("/api/messages")
//             .end((err, res) => {
//                 let messageData = res.body;
//                 //using expect
//                 expect(res).to.have.status(202);
//                 expect(messageData).to.be.a('array');
//                 expect(messageData).to.have.lengthOf(0);
//                 done()
//             })
//     })

//     it("should POST a valid  messages in the database", (done) => {
//         let titleArr = ['one', 'two', 'three'];
//         for (let i = 0; i < titleArr.length; i++) {
//            let message = {
//                 name: titleArr[i] + "the game",
//                 email: titleArr[i] + "@gmail.com",
//                 phone: titleArr[i] + " 0784555555555",
//                 message: " welcome to the messages database"
//             }
//             chai.request(app)
//                 .post("/api/messages")
//                 .send(message)
//                 .end((err, res) => {
//                     let messageData = res.body;
//                     res.should.have.status(201);
//                     res.body.should.be.a('object');
//                     expect(messageData).to.have.all.keys('name', 'email', 'phone',"message", "__v", "_id", "date");
//                     expect(messageData.name, messageData.email, messageData.phone, messageData.message).to.be.a('string');
//                 })
//         }
//         done();
//     })

//     it("Should retrieve messages from database", (done) => {
//         let len;
//         chai.request(app)
//             .get("/api/messages")
//             .end((err, res) => {
//                 var messages = res.body;
//                 len = messages.length;
//                 res.should.have.status(202);
//                 expect(messages).to.be.an("array");
//                 expect(messages[0]).to.be.an('object');
//                 expect(len).to.not.be.an('undefined');
//                 done();
//                 })
//             })
//     })