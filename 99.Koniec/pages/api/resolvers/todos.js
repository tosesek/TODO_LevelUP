let data = require("../data/data.json");
const todos = (dirID) => {
  if (dirID == undefined) return [];
  return data.todos.filter((todo) => {
    if (todo.dir == dirID) {
      return todo;
    }
  });
};
export default todos;
