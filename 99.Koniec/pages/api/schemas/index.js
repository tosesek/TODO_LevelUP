import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type directory {
    id: Int
    name: String
    todos: [todo]
  }
  type todo {
    id: Int
    title: String
    desc: String
    date: String
    done: Boolean
  }

  type Query {
    getDirectories: [directory]
    getTodos(dirID: Int!): [todo]
  }
`;
export default typeDefs;
