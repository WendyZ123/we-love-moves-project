const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  // TODO: Add your code here
  return db("movies")
    .select("*")
    .where({movie_id})
    .first();
}

async function readTheaters(movie_id) {
  return db("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({"mt.movie_id": movie_id});
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function readReviews(movie_id) {
  return db("reviews as r")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("r.*", "c.*")
  .where({"r.movie_id": movie_id})
  .then((reviews) => {
    const newArray = reviews.map(addCritic);
    return newArray;
  });
}



module.exports = {
  list,
  read,
  readTheaters,
  readReviews,
};
