import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue, useRecoilState } from "recoil";
import { toDoCategory, toDoSelector, Categories } from "../atoms";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 35px;
  background-color: #ecf0f1;
`;

const TitleAndButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
`;

const BtnDiv = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 20px;
  background-color: #00b894;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: #55efc4;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #b2bec3;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

function TodoList() {
  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(toDoCategory);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.innerText as any);
  };
  return (
    <Container>
      <TitleAndButton>
        <Title>TO DO LIST</Title>
        <BtnDiv>
          <Button onClick={onClick}>{Categories.TO_DO}</Button>
          <Button onClick={onClick}>{Categories.DOING}</Button>
          <Button onClick={onClick}>{Categories.DONE}</Button>
          <Button>
            <i className="fa-solid fa-plus fa-lg"></i>
          </Button>
        </BtnDiv>
      </TitleAndButton>
      <Line />
      <List>
        <CreateTodo />
        {todos?.map((todo) => (
          <Todo key={todo.id} {...todo}></Todo>
        ))}
      </List>
    </Container>
  );
}

export default TodoList;
