const authors = [
  { id: 1, firstName: "Bob", lastName: "Jackson", birthDate: "2000-01-01" },
  { id: 2, firstName: "Alice", lastName: "Hamilton", birthDate: "1990-12-31" }
];

const books = [
  { id: 1, name: "Harry Blahblah part1", isbn: "blahblah1", authorId: 1 },
  { id: 2, name: "Harry Blahblah r part2", isbn: "blahblah2", authorId: 1 },
  { id: 3, name: "Something funny", isbn: "blahblah3", authorId: 2 }
];

const resolvers = {
  Query: {
    authors: () => authors,
    books: () => {
      return books.map(book => {
        const author = authors.find(author => author.id === book.authorId);
        return Object.assign({}, book, { author });
      });
    }
  },
  Mutation: {
    createAuthor: (_, params) => {
      return {
        author: params.input,
        clientMutationId: "blahblah"
      };
    }
  }
};

module.exports = resolvers;
