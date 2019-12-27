const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID
} = graphql;

// dummy data
let books = [
  { id: "1", name: "Name of the Wind", genre: "Fantasy", authorId: "1" },
  { id: "2", name: "The Final Empire", genre: "Fantasy", authorId: "3" },
  { id: "3", name: "The Long Earth", genre: "Sci-Fi", authorId: "1" },
  { id: "1", name: "Harry Potter", genre: "Fantasy", authorId: "2" }
];

let authors = [
  { id: "1", name: "Shouvik Mukherjee", age: 30 },
  { id: "2", name: "Deepshikha Banerjee", age: 22 },
  { id: "3", name: "Amit Kumar Poreli", age: 45 }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get data from DB
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
