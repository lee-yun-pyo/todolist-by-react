import { useSetRecoilState } from "recoil";
import { IToDo, toDoState, Categories } from "../atoms";

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
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>TO_DO</button>
      )}
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>DOING</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>DONE</button>
      )}
    </li>
  );
}

export default Todo;
