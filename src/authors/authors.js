const express = require("express");
const db = require("../utils/db");

const router = express.Router();

const Model = require("../utils/model/index");

const authors = new Model("authors");

// POST
router.post("/", async (req, res, next) => {
  try {
    const { name, img } = req.body;
    const query = `INSERT INTO authors (name, img) VALUES ('${name}', '${img}')`;
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
    const response = await authors.findOne();
    res.send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET ONE
router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await authors.findById(req.params.id);
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

    const query = `UPDATE authors SET ${body
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
    const query = `DELETE FROM authors WHERE id=${parseInt(id)}`;
    const result = await db.query(query);
    res.send(result);
    res.send("ID doesn't exist");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
