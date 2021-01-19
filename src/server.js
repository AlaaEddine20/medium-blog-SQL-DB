const express = require("express");
const cors = require("cors");

const server = express();

// ROUTER
const articlesRouter = require("./articles/articles");
const categoriesRouter = require("./categories/categories");

// USE CORS
server.use(cors());

// PORT
const port = process.env.PORT || 3000;

// USE JSON
server.use(express.json());

// ROUTES
server.use("/articles", articlesRouter);
server.use("/categories", categoriesRouter);

// RUNNING SERVER
server.listen(port, () => {
  console.log("Server is running on port", port);
});

// ERRORS
server.on("error", (error) => {
  console.log("error : server is not runnig: " + error);
});
