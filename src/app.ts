import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import licenseRoutes from "./modules/licenses/license.routes";

const app = express();

// security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

// body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  // detail logs in development
  app.use(morgan("combined"));
} else {
  // production friendly logs
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms", {
      skip: (req, res) => res.statusCode < 400,
    }),
  );
}

// logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/licenses", licenseRoutes);

app.get("/health", async (req, res) => {
  res.json({ status: "OK", message: "Checking api health" });
});

export default app;
