const express = require("express");
const db = require("../utils/db");
const Model = require("../utils/model/index");
const articles = new Model("articles");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await articles.findOne();
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await articles.findById(req.params.id);
    res.send(rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { headline, subhead, content, category, cover } = req.body;
    const query = `INSERT INTO articles (headline, subhead, content, category, cover) VALUES ('${headline}','${subhead}','${content}','${category}','${cover}');`;
    const result = await db.query(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await articles.findByIdAndUpdate(req.params.id, req.body);
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await articles.findByIdAndDelete(req.params.id, req.body);
    res.send(rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
