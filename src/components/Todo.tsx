import { useSetRecoilState, useRecoilValue } from "recoil";
import { IToDo, toDoState, categoriesState } from "../atoms";
import styled from "styled-components";
import React from "react";

const List = styled.li`
  background-color: white;
  margin-bottom: 18px;
  padding: 15px;
  border-radius: 14px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  display: block;
  margin-bottom: 13px;
  font-size: 18px;
`;

const BtnDiv = styled.div``;

const Btn = styled.button<{ isCategory: boolean }>`
  border: none;
  border-radius: 6px;
  padding: 7px;
  font-size: 10px;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 5px;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${(props) => (props.isCategory ? "auto" : "pointer")};
  &:hover {
    background-color: ${(props) =>
      props.isCategory ? "none" : " rgba(0, 0, 0, 0.1)"};
  }
  :last-child {
    background-color: #ffe0e6;
    color: #f3214f;
    &:hover {
      background-color: rgb(240, 211, 217);
    }
  }
`;

function Todo({ text, id, category }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const changeCategoryOfTodo = (newCategory: any) => {
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
            isCategory={category === cate}
            key={cate}
            disabled={category === cate}
            onClick={() => changeCategoryOfTodo(cate)}
          >
            {cate}
          </Btn>
        ))}
        <Btn isCategory={false} onClick={deleteTodo}>
          <i className="fa-solid fa-trash"></i>
        </Btn>
      </BtnDiv>
    </List>
  );
}

export default Todo;
