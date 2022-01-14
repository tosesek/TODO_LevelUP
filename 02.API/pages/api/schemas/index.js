import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type directory {
    id: ID
    name: String
    todos: [todo]
  }
  type todo {
    id: ID
    title: String!
    desc: String
    date: String
    done: Boolean
  }

  type Query {
    getDirectories: [directory]
    getTodos(dirID: ID): [todo]
  }
`;
export default typeDefs;
