import { useSetRecoilState, useRecoilValue } from "recoil";
import { IToDo, toDoState, categoriesState } from "../atoms";
import styled from "styled-components";
import React from "react";

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
  :last-child {
    background-color: #ffe0e6;
    color: #f3214f;
  }
`;

function Todo({ text, id, category }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (newCategory: any) => {
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldTodos.slice(0, targetIndex),
        { text, id, category: newCategory },
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const deleteList = event.currentTarget.parentNode
      ?.parentNode as HTMLElement | null;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex(
        (toDo) => toDo.id === Number(deleteList?.id)
      );
      return [
        ...oldTodos.slice(0, targetIndex),
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <List id={id.toString()}>
      <Text>{text}</Text>
      <BtnDiv>
        {categories.map((cate) => (
          <Btn
            key={cate}
            disabled={category === cate}
            onClick={() => onClick(cate)}
          >
            {cate}
          </Btn>
        ))}
        <Btn onClick={deleteTodo}>
          <i className="fa-solid fa-trash"></i>
        </Btn>
      </BtnDiv>
    </List>
  );
}

export default Todo;
