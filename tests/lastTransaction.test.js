const app = require("../server");
const request = require("supertest");

describe("GET /lastTransaction", () => {
  it("Should THROW ERROR when you want to enter a blockQuantity with invalid value", (done) => {
    const data = {
      "blockQuantity": null,
      "contractAddress": "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
      "type": "batAbi",
      "walletAddres": "0x046a4A0286dca6cf4219d3F8A168Ea9fD4ECfe52"
    };
    request(app)
      .get("/lastTransaction")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(
        '{"message":"Error: The field blockQuantity is required"}'
      )
      .end((err) => {
        if (err) return done(err);
        done();
      });
  }),
    it("Should THROW ERROR when you want to enter a contractAddress with null value", (done) => {
      const data = {
        "blockQuantity": 40000,
        "contractAddress": null,
        "type": "batAbi",
        "walletAddres": "0x046a4A0286dca6cf4219d3F8A168Ea9fD4ECfe52"
      };
      request(app)
        .get("/lastTransaction")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('{"message":"Error: The field contractAddress is required"}')
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });


});
