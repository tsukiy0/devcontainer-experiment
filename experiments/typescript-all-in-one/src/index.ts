import { Credentials, DynamoDB } from "aws-sdk";
import express from "express";
import { Client } from "pg";

const app = express();

const pingPg = async () => {
  const client = new Client({
    connectionString: process.env.PG_CONNECTION_STRING!,
  });

  await client.connect();

  try {
    const res = await client.query("SELECT 1");

    console.log(res.rows);
  } finally {
    await client.end();
  }
};

const pingDynamoDb = async () => {
  const client = new DynamoDB({
    endpoint: process.env.DYNAMODB_ENDPOINT!,
    region: "us-east-1",
    credentials: new Credentials("accessKeyId", "secretAccessKey"),
  });

  const res = await client.listTables().promise();

  console.log(res);
};

app.get("/ping", (req, res, next) => {
  res.status(200).json({
    message: "pong",
  });
});

app.get("/ping/dynamodb", (req, res, next) => {
  pingDynamoDb()
    .then(() => {
      res.status(200).json({
        message: "pong",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

app.get("/ping/pg", (req, res, next) => {
  pingPg()
    .then(() => {
      res.status(200).json({
        message: "pong",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

app.listen(8080, () => {
  console.log("listening");
});
