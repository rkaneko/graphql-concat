:point_up: graphql-concat example: library :books:
===

- [GraphQL API schema definition](./graphql/schema.graphql)
- [Source GraphQL files](./graphql/src)
- [Concatenated GraphQL files](./graphql/dist)

### Usage

- Concatenating into GraphQL files

```bash
$ gqlcat -i "./graphql/src/**/*.graphql" -e "./graphql/dist/**/*.graphql" -d ./graphql/dist -o file -l gql -s ./graphql/schema.json
```

- Try to use graphiql server

```bash
$ npm start
```
