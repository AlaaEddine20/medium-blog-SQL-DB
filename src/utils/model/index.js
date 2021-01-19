const db = require("../db");

class Model {
  constructor(name) {
    this.name = name;
  }
  async run(query) {
    try {
      const response = await db.query(query);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Find by id
  async findById(id) {
    if (!id) {
      throw new Error("No id provided");
    }
    const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id, 10)}`;
    const response = await this.run(query);
    return response;
  }

  // Find articles
  async findOne(fields) {
    if (!fields || Object.values(fields).length === 0) {
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response;
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ")}`;
      const query = `SELECT * FROM ${this.name} WHERE ${whereClause}`;
      const response = await this.run(query);
      return response;
    }
  }

  // Delete
  async findByIdAndDelete(id, fields) {
    if (!id) {
      throw new Error("No id provided");
    }
    const entries = Object.entries(fields);
    const query = `UPDATE ${this.name} SET ${entries
      .map(([column, value]) => `${column}='${value}'`)
      .join(",")} WHERE id=${parseInt(id)};`;
    const response = await this.run(query);
    return response;
  }

  // UPDATE article
  async findByIdAndUpdate(id, fields) {
    if (!id) {
      throw new Error("No id provided");
    }
    const entries = Object.entries(fields);

    const query = `UPDATE ${this.name} SET ${entries
      .map(([column, value]) => `${column}='${value}'`)
      .join(", ")} WHERE id=${parseInt(id)}`;

    const response = await this.run(query);
    return response;
  }
}

module.exports = Model;
