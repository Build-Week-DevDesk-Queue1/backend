const db = require("../../data/dbConfig");

module.exports = {
  insert,
  find,
  update,
  findBy,
  findById,
  remove,
};

function update(id, changes) {
    return db('tickets')
        .where({ id })
        .update(changes);
}

function find() {
  return db("tickets");
}

function findBy(filter) {
  return db("tickets").where(filter);
}

async function insert(ticket) {
  const [id] = await db("tickets").insert(ticket);

  return findById(id);
}

function findById(id) {
  return db("tickets").where({ id }).first();
}

function remove(id) {
  return db("tickets").where({ id }).del();
}