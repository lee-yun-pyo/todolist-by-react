import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue } from "recoil";
import { IToDo, toDoState } from "../atoms";

function TodoList() {
  const todos = useRecoilValue(toDoState);
  return (
    <div>
      <CreateTodo />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          text={todo.text}
          id={todo.id}
          category={todo.category}
        />
      ))}
    </div>
  );
}

export default TodoList;
