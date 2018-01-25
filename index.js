
const express = require("express");
const fs = require("fs");
const server = express();
const util = require("util");

const route = process.env.ROUTE || "/";
const dataFilePath = process.env.DATA_FILE_PATH;
const serverPort = process.env.SERVER_PORT || 3000;

const readFile = util.promisify(fs.readFile);
let data;

server.get(route, async (req, res) => {
  if (!data) {
    if (process.env.JSON_DATA_FILE) {
      try {
        data = JSON.parse(await readFile(dataFilePath, "utf-8"));
      } catch (error) {
        data = [{ error: `DATA_FILE_PATH "${dataFilePath}": ${error.message}` }];
      }
    } else {
      data = [{ error: "env DATA_FILE_PATH not set" }];
    }
  }

  const idx = Math.floor(Math.random() * data.length);
  res.send(data[idx]);
});

server.listen(serverPort, function () {
  console.log(`server started on ${serverPort}`);
});