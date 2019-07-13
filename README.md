:smiley_cat: graphql-concat :smile_cat:
===

[![npm version][npm-image]][npm-url]
[![Downloads/month][npm-donwload-image]][npm-trends-url]  
[![License: MIT][license]](https://opensource.org/licenses/MIT)
![supports Node.js][node-version]  
[![build status][circleci-image]][circleci-url]  
[![dependencies status][deps-image]][deps-url]
[![devDependencies status][dev-deps-image]][dev-deps-url]  
[![code style: prettier][prettier-image]][prettier-url]
[![codecov][coverage-image]][coverage-url]

### TL;DR

 This CLI is used for sharing GraphQL `FragmentDefinitions` across GraphQL `Operations`. On the basis of GraphQL AST, `gqlcat` concatenates `FragmentDefinitions` into GraphQL `Operation` (e.g. Query or Mutation) which needs Fragments to be executed.

```txt
   +---------------------------+
   |   GraphQL file includes   |
   |  OperationDefinitionNode  +--------------+
   | (e.g. Query and Mutation) |              |
   +---------------------------+              |
                                              |
                                              |
   +---------------------------+              |                                        +--------------------------------------+
   |   GraphQL file includes   |              |                                        |   Concatenated GraphQL DocumentNode  |
   |  OperationDefinitionNode  +---------+    |                              +-------> |    you can execute in your program   |
   | (e.g. Query and Mutation) |         |    +-------> +------------+       |         |  like graphiql or TypeScript program |
   +---------------------------+         +------------> |            +-------+         +--------------------------------------+
                                                        |   gqlcat   |
                                         +------------> |            +-------+         +--------------------------------------+
+----------------------------------+     |    +-------> +------------+       |         |   Concatenated GraphQL DocumentNode  |
|      GraphQL file includes       |     |    |                              +-------> |    you can execute in your program   |
|      FragmentDefinitionNode      +-----+    |                                        |  like graphiql or TypeScript program |
|         (e.g. Fragment)          |          |                                        +--------------------------------------+
|  you want to share between files |          |
------------------------------------          |
                                              |
                                              |
+----------------------------------+          |
|      GraphQL file includes       |          |
|      FragmentDefinitionNode      +----------+
|         (e.g. Fragment)          |
|  you want to share between files |
+----------------------------------+

```

### Usage

```bash
$ gqlcat -h

graphql-concat

  Concatenate multiple GraphQL files to executable operation files. 

Version

  1.1.0

Synopsis

  $ gqlcat [--include glob] [--execlude glob] [--dist path] [--output           
  stdout|file] [--lang gql|ts] [--schema path] [--project graphql-project-name] 
  $ gqlcat --help                                                               

Options

  -i, --include string[]   Files you want to include. Default is "./**/*.graphql" "./**/*.gql". You can  
                           specify this option multiply. This option also can be specified via           
                           .graphqlconfig includes values.                                               
  -e, --exclude string[]   Files you want to exclude. Default is not set. You can specify this option    
                           multiply. This option also can be specified via .graphqlconfig excludes       
                           values.                                                                       
  -d, --dist string        Path to distination of gqlcat outputs. Default is dist.                       
  -o, --output type        Output type. Default is stdout.                                               
  -l, --lang type          Language type. Default is gql.                                                
  -s, --schema string      Path to schema.json of your project. This is used for validating concatenated 
                           files. Default is not set, so validation isn't executed. This option also     
                           can be specified via .graphqlconfig schemaPath value.                         
  -p, --project string     Your project name. If your .graphqlconfig file has multiple project configs,  
                           you must specify this option. Default is not set.                             
  -h, --help               Display usage.                                                                
  -v, --version            Display version.

Examples

  Case: Specifying all options via command line args.   $ gqlcat -i "./src/**/*.graphql" -i "./src/**/*.gql" -e "./dist/**/*.graphql" -d ./dist -o file -l ts -s  
                                                        ./src/schema.json                                                                                         
  Case: Using your .graphqlconfig.                      $ gqlcat -d ./dist -o stdout -l gql -p github                                                             

About

  Project home: https://github.com/rkaneko/graphql-concat

```

### Examples

Please see [Library example](./examples/library).

### License

- [MIT License](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/graphql-concat.svg
[npm-url]: https://www.npmjs.com/package/graphql-concat
[npm-donwload-image]: https://img.shields.io/npm/dm/graphql-concat.svg
[npm-trends-url]: http://www.npmtrends.com/graphql-concat
[circleci-image]: https://circleci.com/gh/rkaneko/graphql-concat.svg?style=shield
[circleci-url]: https://circleci.com/gh/rkaneko/graphql-concat
[deps-image]: https://david-dm.org/rkaneko/graphql-concat.svg
[deps-url]: https://david-dm.org/rkaneko/graphql-concat
[dev-deps-image]: https://david-dm.org/rkaneko/graphql-concat/dev-status.svg
[dev-deps-url]: https://david-dm.org/rkaneko/david#info=devDependencies
[node-version]: https://img.shields.io/badge/Node.js%20support-v8,v10,v12-brightgreen.svg
[coverage-image]: https://codecov.io/gh/rkaneko/graphql-concat/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/rkaneko/graphql-concat
[license]: https://img.shields.io/npm/l/graphql-concat.svg

[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=shield
[prettier-url]: https://github.com/prettier/prettier
