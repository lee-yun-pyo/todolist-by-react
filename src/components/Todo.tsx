import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function Todo({ text, id, category }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldTodos.slice(0, targetIndex),
        { text, id, category: newCategory },
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>TO_DO</button>
      )}
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>DOING</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>DONE</button>
      )}
    </li>
  );
}

export default Todo;
