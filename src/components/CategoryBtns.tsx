import styled from "styled-components";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedCategoryState,
  AddListModalState,
  categoriesState,
  toDoState,
} from "../atoms";

const Container = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 50px;
  @media (max-width: 420px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 42px;
    gap: 18px;
  }
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
  @media (max-width: 420px) {
    width: 104px;
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
  @media (max-width: 420px) {
    font-size: 17px;
  }
`;

function CategorysBtns() {
  const todos = useRecoilValue(toDoState);
  const [currentCategory, setCurrentCategory] = useRecoilState(
    selectedCategoryState
  );
  const setDisplayModal = useSetRecoilState(AddListModalState);
  const categories = useRecoilValue(categoriesState);
  const selectCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentCategory(event.currentTarget.innerText as any);
  };
  const showModal = () => {
    setDisplayModal(true);
  };
  const categoriesOfAllTodos = todos.map((todo) => todo.category);
  return (
    <Container>
      {categories.map((category) => (
        <BtnDiv key={category} isActive={currentCategory === category}>
          <Button key={category} onClick={selectCategory}>
            {category}
          </Button>
          <Circle
            count={
              categoriesOfAllTodos.filter((todo) => todo === category).length
            }
          >
            {categoriesOfAllTodos.filter((todo) => todo === category).length}
          </Circle>
        </BtnDiv>
      ))}
      <BtnDiv isActive={false}>
        <Button onClick={showModal}>
          <i className="fa-solid fa-plus fa-lg"></i>
        </Button>
      </BtnDiv>
    </Container>
  );
}

export default CategorysBtns;
