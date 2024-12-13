const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");
const userRoutes = require("./routes/user");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");
const log = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(log);

// Swagger API route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);

// Error handler
app.use(async function (err, req, res, next) {
  let status = err.statusCode || 500;
  let message = err.message || "";
  let data = req.body || {};
  // Set error status
  res.status(status);
  let response = {
    data: data,
    status: status,
    message: message,
  };
  // Return error response
  res.json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
