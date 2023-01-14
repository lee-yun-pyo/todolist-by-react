import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  toDoCategory,
  toDoSelector,
  Categories,
  AddListModalState,
} from "../atoms";
import styled from "styled-components";
import ModalAddList from "../etc/ModalAddList";

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
  grid-template-columns: repeat(4, 1fr);
  margin-top: 30px;
`;

const Button = styled.button<{ isActive: boolean }>`
  padding: 15px;
  font-size: 20px;
  background-color: ${(props) => (props.isActive ? "#55efc4" : "#00b894")};
  border: none;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #55efc4;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #b2bec3;
`;

function TodoList() {
  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(toDoCategory);
  const setDisplayModal = useSetRecoilState(AddListModalState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.innerText as any);
  };
  const showModal = () => {
    setDisplayModal(true);
  };
  return (
    <Container>
      <TitleAndButton>
        <Title>TO DO LIST</Title>
        <BtnDiv>
          <Button onClick={onClick} isActive={category === Categories.TO_DO}>
            {Categories.TO_DO}
          </Button>
          <Button onClick={onClick} isActive={category === Categories.DOING}>
            {Categories.DOING}
          </Button>
          <Button onClick={onClick} isActive={category === Categories.DONE}>
            {Categories.DONE}
          </Button>
          <Button isActive={false} onClick={showModal}>
            <i className="fa-solid fa-plus fa-lg"></i>
          </Button>
        </BtnDiv>
      </TitleAndButton>
      <Line />
      <div>
        <CreateTodo />
        <ul>
          {todos?.map((todo) => (
            <Todo key={todo.id} {...todo}></Todo>
          ))}
        </ul>
      </div>

      <ModalAddList />
    </Container>
  );
}

export default TodoList;
