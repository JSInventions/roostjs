import express from "express";
import fs from "fs";
import roost from "../roost.js";

const app = express();

app.get("/", (req, res) => {
  fs.readFile("./host/index.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading index.json");
    }
    res.setHeader('Content-Type', 'text/html');  
    const jsonData = JSON.parse(data); 
    const html = roost.compile(jsonData);
    res.send(html);
    console.log(html);
  });
});

app.get("/index.css", (req, res) => {
  fs.readFile("./host/index.css", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading index.css");
    }
    res.setHeader('Content-Type', 'text/css');
    res.send(data);
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
