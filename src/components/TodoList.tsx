import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  toDoCategory,
  toDoSelector,
  AddListModalState,
  categoriesState,
  toDoState,
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

const BtnContainer = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 50px;
`;

const BtnDiv = styled.div<{ isActive: boolean }>`
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  max-width: 110px;
  background-color: ${(props) => (props.isActive ? "#40739e" : "#273c75")};
  &:hover {
    background-color: #40739e;
  }
`;
const Button = styled.button`
  cursor: pointer;
  color: white;
  border: none;
  transition: all 0.1s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: transparent;
  padding: 15px 10px;
  font-size: 20px;
  width: 100%;
`;

const Circle = styled.span<{ count: number }>`
  display: ${(props) => (props.count > 0 ? "block" : "none")};
  background-color: #e84118;
  font-size: 19px;
  color: #fff;
  padding: 6px 10px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  position: absolute;
  top: -10px;
  right: -12px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
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
  const allTodos = useRecoilValue(toDoState);
  const [category, setCategory] = useRecoilState(toDoCategory);
  const setDisplayModal = useSetRecoilState(AddListModalState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.innerText as any);
  };
  const showModal = () => {
    setDisplayModal(true);
  };
  const categoryInTodos = allTodos.map((todo) => todo.category);
  return (
    <Container>
      <TitleAndButton>
        <Title>TO DO LIST</Title>
        <BtnContainer>
          {categories.map((cate) => (
            <BtnDiv key={cate} isActive={category === cate}>
              <Button key={cate} onClick={onClick}>
                {cate}
              </Button>
              <Circle
                count={categoryInTodos.filter((todo) => todo === cate).length}
              >
                {categoryInTodos.filter((todo) => todo === cate).length}
              </Circle>
            </BtnDiv>
          ))}
          <BtnDiv isActive={false}>
            <Button onClick={showModal}>
              <i className="fa-solid fa-plus fa-lg"></i>
            </Button>
          </BtnDiv>
        </BtnContainer>
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
