const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shouvikfullstack:shouvikfullstack@cluster0-bkfcf.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connection.once('open', ()=> {
  console.log('Connection made!');
})

console.log(mongoose.connections);

const app = express();
const port = 4000;

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.get("/", (req, res) => res.send("Express server running..."));

app.listen(port, () => console.log(`App listening on port ${port}!`));
