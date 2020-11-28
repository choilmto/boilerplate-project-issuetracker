/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */
import Mocha from "mocha";
var chai = require("chai");
import chaiHttp = require("chai-http");
var assert: Chai.AssertStatic = chai.assert;
var expect = chai.expect;
var server: Express.Application = require("../server");
var chaiDateString = require("chai-date-string");
chai.use(chaiHttp);
chai.use(chaiDateString);

suite("Functional Tests", function (): void {
  suite(
    "POST /api/issues/{project} => object with issue data",
    function (): void {
      test("Every field filled in", function (done: Mocha.Done): void {
        chai
          .request(server)
          .post("/api/issues/test")
          .send({
            issue_title: "Title",
            issue_text: "text",
            created_by: "Functional Test - Every field filled in",
            assigned_to: "Chai and Mocha",
            status_text: "In QA",
          })
          .end(function (err, res): void {
            if (err) {
              done(err);
            }
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, "Title");
            assert.equal(res.body.issue_text, "text");
            assert.equal(
              res.body.created_by,
              "Functional Test - Every field filled in"
            );
            assert.equal(res.body.assigned_to, "Chai and Mocha");
            assert.equal(res.body.status_text, "In QA");
            expect(res.body.created_on).to.be.a.dateString();
            expect(res.body.updated_on).to.be.a.dateString();
            assert.equal(res.body.open, true);
            assert.exists(res.body._id);
            done();
          });
      });

      test("Required fields filled in", function (done: Mocha.Done): void {
        chai
          .request(server)
          .post("/api/issues/test")
          .send({
            issue_title: "Title",
            issue_text: "text",
            created_by: "Functional Test - Every field filled in",
          })
          .end(function (err, res): void {
            if (err) {
              done(err);
            }
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, "Title");
            assert.equal(res.body.issue_text, "text");
            assert.equal(
              res.body.created_by,
              "Functional Test - Every field filled in"
            );
            assert.isUndefined(res.body.assigned_to);
            assert.isUndefined(res.body.status_text);
            expect(res.body.created_on).to.be.a.dateString();
            expect(res.body.updated_on).to.be.a.dateString();
            assert.equal(res.body.open, true);
            assert.exists(res.body._id);
            done();
          });
      });

      test("Missing required fields", function (done: Mocha.Done): void {
        chai
          .request(server)
          .post("/api/issues/test")
          .send({
            issue_title: "Title",
            issue_text: "text",
          })
          .end(function (err, res): void {
            if (err) {
              done(err);
            }
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { error: "Missing required fields." });
            done();
          });
      });
    }
  );

  suite("PUT /api/issues/{project} => text", function (): void {
    test("No body", function (done: Mocha.Done): void {});

    test("One field to update", function (done: Mocha.Done): void {});

    test("Multiple fields to update", function (done: Mocha.Done): void {});
  });

  suite(
    "GET /api/issues/{project} => Array of objects with issue data",
    function () {
      test("No filter", function (done: Mocha.Done): void {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({})
          .end(function (err, res): void {
            if (err) {
              return done(err);
            }
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });

      test("One filter", function (done: Mocha.Done): void {});

      test("Multiple filters (test for multiple fields you know will be in the db for a return)", function (done: Mocha.Done): void {});
    }
  );

  suite("DELETE /api/issues/{project} => text", function (): void {
    test("No _id", function (done: Mocha.Done): void {});

    test("Valid _id", function (done: Mocha.Done): void {});
  });
});
