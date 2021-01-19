const express = require("express");
const db = require("../utils/db");

const router = express.Router();

const Model = require("../utils/model/index");

const categories = new Model("categories");

// POST
router.post("/", async (req, res, next) => {
  try {
    const { category_name } = req.body;
    const query = `INSERT INTO categories (category_name) VALUES ('${category_name}')`;
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
    const response = await categories.findOne();
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET ONE
router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await categories.findById(req.params.id);
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

    const query = `UPDATE categories SET ${body
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
    const body = Object.entries(req.body);
    const id = req.params.id;

    const query = `DELETE FROM categories WHERE id=${parseInt(id)}`;
    const result = await db.query(query);
    res.send(result);
    res.send("ID doesn't exist");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
