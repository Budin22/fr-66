// @ts-ignore
import express, { Request, Response } from "express";

// @ts-ignore
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

console.log("server");

// app.get("/good", (req: Request, res: Response): void => {
//   res.json(req.body);
// });

app.post("/good", (req: Request, res: Response) => {
  console.log(req.body, "post");

  res.send({ name: "Budin" });
});

app.listen("8001", () => {
  console.log("run server 8001");
});
