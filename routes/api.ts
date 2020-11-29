/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var db = require("../connect");
var ObjectID = require("mongodb").ObjectID;
var logger = require("../logger");

import { Application, Request, Response, NextFunction } from "express";

module.exports = function (app: Application): void {
  app
    .route("/api/issues/:project")

    .get(function (req: Request, res: Response) {
      var project: string = req.params.project;
    })

    .post(async function (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      var project: string = req.params.project;
      var body = req.body;
      if (
        !body.hasOwnProperty("issue_title") ||
        !body.hasOwnProperty("issue_text") ||
        !body.hasOwnProperty("created_by")
      ) {
        res.json({ error: "Missing required fields." });
        return;
      }
      var entry: object = {
        assigned_to: "",
        status_text: "",
        ...body,
        created_on: new Date(),
        updated_on: new Date(),
        open: true,
      };
      try {
        var dbo = await db;
        var saved = await dbo
          .collection("issue_tracker")
          .insertOne({ ...entry, project_name: project });
        res.json({
          ...entry,
          _id: saved.insertedId,
        });
      } catch (error) {
        logger.error(error);
        next(error);
      }
    })

    .put(async function (req: Request, res: Response): Promise<void> {
      var project: string = req.params.project;
      var body = req.body;
      var _id: string = body._id;
      delete body._id;

      if (!_id) {
        res.send("missing required fields");
        return;
      }
      if (Object.keys(body).length === 0) {
        res.send("no updated field sent");
        return;
      }
      try {
        var dbo = await db;
        await dbo
          .collection("issue_tracker")
          .updateOne(
            { _id: ObjectID(_id), project_name: project },
            { $set: { ...body, updated_on: new Date() } },
            { upsert: false }
          );
        res.send("successfully updated");
      } catch (error) {
        res.send("could not update " + _id);
      }
    })

    .delete(function (req: Request, res: Response) {
      var project: string = req.params.project;
    });
};
