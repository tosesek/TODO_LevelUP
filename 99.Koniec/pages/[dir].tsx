import { useRouter } from "next/router";

const TodoTasks = () => {
  const router = useRouter();
  const { dir } = router.query;
  return dir;
};
export default TodoTasks;
