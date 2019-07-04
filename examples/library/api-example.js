const path = require("path");

const { default: api } = require("../../dist/api/index.js");
const { default: output } = require("../../dist/output/index.js");

const projectRoot = path.resolve(path.dirname(""));
const concatOption = {
  includes: [
    path.join(projectRoot, "graphql", "src", "fragment", "*.graphql"),
    path.join(projectRoot, "graphql", "src", "operation", "Bootstrap.graphql")
  ],
  excludes: [path.join(projectRoot, "graphql", "dist", "**", "*.graphql")],
  dist: path.join(projectRoot, "graphql", "dist"),
  output: "stdout",
  lang: "gql",
};

api(projectRoot, concatOption)
  .then(computed =>
    output(computed, concatOption.output, concatOption.lang)
  ).then(() => {
    console.log("Completed.");
    process.exit(0);
  }).catch(error => {
    console.error(error);
    process.exit(1);
  });
