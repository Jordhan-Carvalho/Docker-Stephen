import express, { Request, Response } from "express";
import redis from "redis";

const app = express();
// connection to redis server
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});
client.set("visits", "0");

app.get("/", (req: Request, res: Response) => {
  process.exit(1);
  //get info from redis
  client.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", (parseInt(visits) + 1).toString());
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
