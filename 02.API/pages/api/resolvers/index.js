import getTodos from "./todos";
import getDirectories from "./directories";

const resolvers = {
  Query: {
    getTodos: (req, res) => getTodos(res.dirID),
    getDirectories: getDirectories,
  },
};
export default resolvers;
