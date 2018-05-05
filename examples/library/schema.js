const { makeExecutableSchema } = require("graphql-tools");
const fs = require("fs");
const path = require("path");

const resolvers = require("./resolvers");

const typeDefs = fs.readFileSync(
  "./graphql/schema.graphql",
  { encoding: "utf-8" }
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
