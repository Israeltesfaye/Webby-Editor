import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import UserRouter from "./routes/user.routes.js";

const app = new Hono();

app.route("/users", UserRouter);

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
