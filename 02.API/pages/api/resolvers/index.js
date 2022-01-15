import getTodos from "./todos";
import getDirectories from "./directories";
let data = require("../data/data.json");

const resolvers = {
  Query: {
    getTodos: (_parent, args) => getTodos(args.dirID),
    getDirectories: getDirectories,
  },
};
export default resolvers;
