import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hi there");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
