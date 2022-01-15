let data = require("../data/data.json");
const todos = (dirID) => {
  return data.todos.filter((todo) => {
    if (todo.dir == dirID) {
      return todo;
    }
  });
};
export default todos;
