import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  toDoCategory,
  toDoSelector,
  AddListModalState,
  categoriesState,
} from "../atoms";
import styled from "styled-components";
import ModalAddList from "../etc/ModalAddList";

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

const BtnDiv = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 30px;
`;

const Button = styled.button<{ isActive: boolean }>`
  padding: 15px 10px;
  font-size: 20px;
  background-color: ${(props) => (props.isActive ? "#55efc4" : "#00b894")};
  border: none;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
  &:hover {
    background-color: #55efc4;
  }
`;

const Line = styled.div`
  height: 1px;
  width: 90%;
  background-color: #b2bec3;
  margin: 30px 0;
`;

const SubContainer = styled.div`
  width: 470px;
`;

const TodoLists = styled.ul`
  width: inherit;
`;

function TodoList() {
  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(toDoCategory);
  const setDisplayModal = useSetRecoilState(AddListModalState);
  const categories = useRecoilValue(categoriesState);
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
          {categories.map((cate) => (
            <Button key={cate} onClick={onClick} isActive={category === cate}>
              {cate}
            </Button>
          ))}
          <Button isActive={false} onClick={showModal}>
            <i className="fa-solid fa-plus fa-lg"></i>
          </Button>
        </BtnDiv>
      </TitleAndButton>
      <Line />
      <SubContainer>
        <CreateTodo />
        <TodoLists>
          {todos?.map((todo) => (
            <Todo key={todo.id} {...todo}></Todo>
          ))}
        </TodoLists>
      </SubContainer>
      <ModalAddList />
    </Container>
  );
}

export default TodoList;
