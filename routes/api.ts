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
          .collection(project)
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

    .put(function (req: Request, res: Response) {
      var project: string = req.params.project;
    })

    .delete(function (req: Request, res: Response) {
      var project: string = req.params.project;
    });
};
