const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgresql://dev_k1fj_user:dK13Bd7z5xDc7UKfhPvaDUbuJhUnWSuw@dpg-cquqf22j1k6c73djtn3g-a.oregon-postgres.render.com/dev_k1fj?ssl=true",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    ssl: {
      rejectUnauthorized: false // This will allow connections without requiring SSL certificates to be valid.
    }
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    ssl: {
      rejectUnauthorized: false // This will allow connections without requiring SSL certificates to be valid.
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
