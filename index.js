
const express = require("express");
const fs = require("fs");
const server = express();
const util = require("util");

const route = process.env.ROUTE;
const dataFilePath = process.env.DATA_FILE_PATH;
const 

const readFile = util.promisify(fs.readFile);
let data;

server.get(, async (req, res) => {
  if (!data) {
    if (process.env.JSON_DATA_FILE) {
      try {
        data = JSON.parse(await readFile(process.env.DATA_FILE_PATH, "utf-8"));
      } catch (error) {
        data = [{ error: `DATA_FILE_PATH "${process.env.DATA_FILE_PATH}": ${error.message}` }];
      }
    } else {
      data = [{ error: "env DATA_FILE_PATH not set" }];
    }
  }

  const idx = Math.floor(Math.random() * data.length);
  res.send(data[idx]);
});

server.listen(process.env.SERVER_PORT, function () {
  console.log(`server started on ${process.env.SERVER_PORT}`);
});