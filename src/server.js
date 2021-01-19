const express = require("express");
const cors = require("cors");

const server = express();

const articlesRouter = require("./articles/articles");

server.use(cors());

const port = process.env.PORT || 3000;
server.use(express.json());
server.use("/articles", articlesRouter);

server.listen(port, () => {
  console.log("Server is running on port", port);
});

server.on("error", (error) => {
  console.log("error : server is not runnig: " + error);
});
