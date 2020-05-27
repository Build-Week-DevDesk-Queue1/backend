const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
};

function find() {
  return db("tickets");
}

function findBy(filter) {
  return db("tickets").where(filter);
}

async function add(user) {
  const [id] = await db("tickets").insert(user);

  return findById(id);
}

function findById(id) {
  return db("tickets").where({ id }).first();
}

function remove(id) {
  return db("tickets").where({ id }).del();
}