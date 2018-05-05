const GetEntryCommit = `
query GetEntryCommit($owner: String!, $name: String!, $expression: String = "refs/heads/master", $path: String!) {
  repository(owner: $owner, name: $name) {
    object(expression: $expression) {
      ...EntryLatestCommit
    }
  }
}

fragment EntryLatestCommit on Commit {
  history(first: 1, path: $path) {
    edges {
      cursor
      node {
        ...EntryCommit
      }
    }
  }
}

fragment EntryCommit on Commit {
  id
  author {
    user {
      id
    }
  }
  committedDate
}

`;
export GetEntryCommit;
