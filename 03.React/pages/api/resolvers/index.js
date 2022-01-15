import getTodos from "./todos";
import getDirectories from "./directories";

const resolvers = {
  Query: {
    getTodos: getTodos,
    getDirectories: getDirectories,
  },
};
export default resolvers;
