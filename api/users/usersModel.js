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
    return db('users')
        .where({ id })
        .update(changes);
}

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function insert(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}

function remove(id) {
  return db("users").where({ id }).del();
}
