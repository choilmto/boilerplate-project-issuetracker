/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
import { Application, Request, Response } from "express";

const CONNECTION_STRING: string = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app: Application): void {
  app
    .route("/api/issues/:project")

    .get(function (req: Request, res: Response) {
      var project: string = req.params.project;
    })

    .post(function (req: Request, res: Response) {
      var project: string = req.params.project;
    })

    .put(function (req: Request, res: Response) {
      var project: string = req.params.project;
    })

    .delete(function (req: Request, res: Response) {
      var project: string = req.params.project;
    });
};
