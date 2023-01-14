import { useSetRecoilState } from "recoil";
import { IToDo, toDoState, Categories } from "../atoms";
import styled from "styled-components";

const List = styled.li`
  background-color: white;
  margin-bottom: 14px;
  padding: 15px;
  border-radius: 14px;
  border: 1px solid #00b894;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  display: block;
  margin-bottom: 13px;
  font-size: 18px;
`;

const BtnDiv = styled.div``;

const Btn = styled.button`
  border: none;
  border-radius: 6px;
  padding: 7px;
  font-size: 10px;
  font-weight: 600;
  margin-right: 6px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

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
    <List>
      <Text>{text}</Text>
      <BtnDiv>
        {category !== Categories.TO_DO && (
          <Btn onClick={() => onClick(Categories.TO_DO)}>TO_DO</Btn>
        )}
        {category !== Categories.DOING && (
          <Btn onClick={() => onClick(Categories.DOING)}>DOING</Btn>
        )}
        {category !== Categories.DONE && (
          <Btn onClick={() => onClick(Categories.DONE)}>DONE</Btn>
        )}
        <Btn>
          <i className="fa-solid fa-trash"></i>
        </Btn>
      </BtnDiv>
    </List>
  );
}

export default Todo;
