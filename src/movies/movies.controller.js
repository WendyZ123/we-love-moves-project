const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movie = await service.read(request.params.movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.movie });
}

async function theatersExist(request, response, next) {
  // TODO: Add your code here.
  const theaters = await service.readTheaters(request.params.movieId);
  if (theaters) {
    response.locals.theaters = theaters;
    return next();
  }
  next({ status: 404, message: `Theaters cannot be found.` });
}

async function reviewsExist(request, response, next) {
  // TODO: Add your code here.
  const reviews = await service.readReviews(request.params.movieId);
  if (reviews) {
    response.locals.reviews = reviews;
    return next();
  }
  next({ status: 404, message: `Reviews cannot be found.` });
}


async function readTheaters(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.theaters });
}

async function readReviews(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.reviews });
}

async function list(request, response) {
  // TODO: Add your code here.
  const is_showing = request.query.is_showing;
  response.json({ data: await service.list(is_showing) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theatersExist), readTheaters],
  readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(reviewsExist), readReviews],
};
