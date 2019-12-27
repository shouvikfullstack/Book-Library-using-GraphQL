const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');

const app = express();
const port = 4000;

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.get("/", (req, res) => res.send("Express server running..."));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
