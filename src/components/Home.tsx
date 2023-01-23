import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCategoryState, toDoSelector, categoriesState } from "../atoms";
import styled from "styled-components";
import ModalAddList from "../etc/ModalAddList";
import GithubBtn from "../etc/GithubBtn";
import { useEffect } from "react";
import DeleteBtns from "./DeleteBtns";
import CategorysBtns from "./CategoryBtns";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 30px auto;
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

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #b2bec3;
  margin-top: 30px;
`;

const SubContainer = styled.div`
  width: 470px;
`;

const TodoLists = styled.ul`
  width: inherit;
`;

function Home() {
  const todos = useRecoilValue(toDoSelector);
  const setCurrentCategory = useSetRecoilState(selectedCategoryState);
  const categories = useRecoilValue(categoriesState);
  useEffect(() => {
    setCurrentCategory(categories[0]);
  }, []);
  return (
    <Container>
      <TitleAndButton>
        <Title>To Do List</Title>
        <CategorysBtns />
      </TitleAndButton>
      <Line />
      <DeleteBtns />
      <SubContainer>
        <CreateTodo />
        <TodoLists>
          {todos?.map((todo) => (
            <Todo key={todo.id} {...todo}></Todo>
          ))}
        </TodoLists>
      </SubContainer>
      <ModalAddList />
      <GithubBtn />
    </Container>
  );
}

export default Home;
