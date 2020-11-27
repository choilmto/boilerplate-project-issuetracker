/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *       DO NOT EDIT THIS FILE
 *       For FCC testing purposes!
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

"use strict";

import { Test, emitter as runner } from "../test-runner";
var cors = require("cors");
var fs = require("fs");
import { Application, Response, Request, NextFunction } from "express";
var logger = require("../logger");

module.exports = function (app: Application) {
  app
    .route("/_api/server.js")
    .get(function (req: Request, res: Response, next: NextFunction): void {
      logger.info("requested");
      fs.readFile(__dirname + "/server.js", function (err, data): void {
        if (err) return next(err);
        res.send(data.toString());
      });
    });
  app
    .route("/_api/routes/api.js")
    .get(function (req: Request, res: Response, next: NextFunction): void {
      logger.info("requested");
      fs.readFile(__dirname + "/routes/api.js", function (err, data): void {
        if (err) return next(err);
        res.type("txt").send(data.toString());
      });
    });
  app
    .route("/_api/controllers/convertHandler.js")
    .get(function (req: Request, res: Response, next: NextFunction): void {
      logger.info("requested");
      fs.readFile(__dirname + "/controllers/convertHandler.js", function (
        err,
        data
      ): void {
        if (err) return next(err);
        res.type("txt").send(data.toString());
      });
    });

  var error;
  app.get(
    "/_api/get-tests",
    cors(),
    function (req: Request, res: Response, next: NextFunction): void {
      logger.info(error);
      if (!error && process.env.NODE_ENV === "test") return next();
      res.json({ status: "unavailable" });
    },
    function (req: Request, res: Response, next: NextFunction): void {
      if (!runner.report) return next();
      res.json(testFilter(runner.report, req.query.type, req.query.n));
    },
    function (req: Request, res: Response): void {
      runner.on("done", function (report): void {
        process.nextTick(() =>
          res.json(testFilter(runner.report, req.query.type, req.query.n))
        );
      });
    }
  );
  app.get("/_api/app-info", function (req: Request, res): void {
    var hs: string[] = Object.keys((<any>res)._headers).filter(
      (h) => !h.match(/^access-control-\w+/)
    );
    var hObj: object = {};
    hs.forEach((h: string): void => {
      hObj[h] = (<any>res)._headers[h];
    });
    delete (<any>res)._headers["strict-transport-security"];
    res.json({ headers: hObj });
  });
};

function testFilter(tests: Test[], type, n): Test[] | Test {
  var out: Test[];
  Response;
  switch (type) {
    case "unit":
      out = tests.filter((t) => t.context.match("Unit Tests"));
      break;
    case "functional":
      out = tests.filter(
        (t): boolean =>
          t.context.match("Functional Tests") && !t.title.match("#example")
      );
      break;
    default:
      out = tests;
  }
  if (n !== undefined) {
    return out[n] || out;
  }
  return out;
}
