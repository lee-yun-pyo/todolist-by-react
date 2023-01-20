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
  width: 110px;
  background-color: ${(props) => (props.isActive ? "#40739e" : "#273c75")};
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #40739e;
    transform: translateY(-4px);
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
  border-radius: 100px;
  position: absolute;
  top: -10px;
  right: -12px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #b2bec3;
  margin-top: 30px;
`;

const DeleteBtnDiv = styled.div`
  width: 100%;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
`;

const DeleteBtn = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  background-color: #fff;
  border-radius: 100px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #273c75;
    color: rgba(255, 255, 255, 0.9);
    transform: translateY(-4px);
  }
`;

const SubContainer = styled.div`
  width: 470px;
`;

const TodoLists = styled.ul`
  width: inherit;
`;

function TodoList() {
  const todos = useRecoilValue(toDoSelector);
  const [allTodos, setAllTodos] = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(toDoCategory);
  const setDisplayModal = useSetRecoilState(AddListModalState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.innerText as any);
  };
  const showModal = () => {
    setDisplayModal(true);
  };
  const deleteAll = () => {
    setAllTodos((prev) => prev.filter((todo) => todo.category !== category));
  };
  const deleteCategory = () => {
    setCategories((prev) => prev.filter((cate) => cate !== category));
    setAllTodos((prev) => prev.filter((todo) => todo.category !== category));
  };
  const categoryInTodos = allTodos.map((todo) => todo.category);
  return (
    <Container>
      <TitleAndButton>
        <Title>To Do List</Title>
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
      <DeleteBtnDiv>
        <DeleteBtn onClick={deleteAll}>리스트 전체 삭제</DeleteBtn>
        <DeleteBtn onClick={deleteCategory}>현재 카테고리 삭제</DeleteBtn>
      </DeleteBtnDiv>
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
