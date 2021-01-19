const express = require("express");
const db = require("../utils/db");
const Model = require("../utils/model/index");

const articles = new Model("articles");

const router = express.Router();

// POST
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

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const response = await articles.findOne();
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET ONE
router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await articles.findById(req.params.id);
    res.send(rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const body = Object.entries(req.body);
    const id = req.params.id;

    const query = `UPDATE articles SET ${body
      .map(([prop, value]) => `${prop}='${value}'`)
      .join(", ")} WHERE id=${parseInt(id)}`;
    const result = await db.query(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM articles WHERE id=${parseInt(id)}`;
    const result = await db.query(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
