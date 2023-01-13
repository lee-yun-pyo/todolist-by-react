import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue, useRecoilState } from "recoil";
import { toDoCategory, toDoSelector, Categories } from "../atoms";

function TodoList() {
  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(toDoCategory);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };
  return (
    <div>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <CreateTodo />
      <hr />
      {todos?.map((todo) => (
        <Todo key={todo.id} {...todo}></Todo>
      ))}
    </div>
  );
}

export default TodoList;
