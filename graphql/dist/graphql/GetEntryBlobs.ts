const GetEntryBlobs = `
query GetEntryBlobs($owner: String!, $name: String!, $expression: String = "refs/heads/master") {
  repository(owner: $owner, name: $name) {
    object(expression: $expression) {
      ...CommitEntryTree
    }
  }
}

fragment CommitEntryTree on Commit {
  tree {
    __typename
    ...EntryTree
  }
}

fragment EntryTree on Tree {
  entries {
    type
    name
    object {
      __typename
      ... on Tree {
        entries {
          type
          name
          object {
            __typename
            ... on Tree {
              entries {
                type
                name
                object {
                  __typename
                  ... on Tree {
                    entries {
                      type
                      name
                      object {
                        __typename
                        ... on Tree {
                          entries {
                            type
                            name
                            object {
                              __typename
                              ...EntryBlob
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

fragment EntryBlob on Blob {
  commitUrl
  text
}

`;
export GetEntryBlobs;
