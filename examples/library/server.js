const express = require("express");
const graphqlHTTP = require("express-graphql");

const schema = require("./schema");

const port = process.env.APP_PORT || 3000;
const app = express();
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
})
);

app.listen(port, error => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log(`==> 🌎  Listening on port ${port}. Open up http://localhost${port}/graphql in your browser`);
  }
});

process.on("SIGINT", () => process.exit(0));
