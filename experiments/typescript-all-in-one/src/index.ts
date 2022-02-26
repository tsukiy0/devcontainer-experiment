import express from "express";

const app = express();

app.get("/ping", (req, res, next) => {
  res.status(200).json({
    message: "pong",
  });
});

app.listen(8080, () => {
  console.log("listening");
});
