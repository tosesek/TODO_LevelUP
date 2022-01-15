import getTodos from "./todos";
import getDirectories from "./directories";
let data = require("../data/data.json");

const resolvers = {
  Query: {
    getTodos: (req, res) => getTodos(res.dirID),
    getDirectories: getDirectories,
  },
};
export default resolvers;
