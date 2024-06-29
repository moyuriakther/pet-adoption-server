import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

// app.use(cors());

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "https://pet-adoption-client-three.vercel.app",
      "http://localhost:3000",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to pet adoption platform!");
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
