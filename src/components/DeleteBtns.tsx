import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesState, selectedCategoryState, toDoState } from "../atoms";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
`;

const Button = styled.button`
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
  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

function DeleteBtns() {
  const setTodos = useSetRecoilState(toDoState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [currentCategory, setCurrentCategory] = useRecoilState(
    selectedCategoryState
  );
  const deleteAll = () => {
    setTodos((prev) =>
      prev.filter((todo) => todo.category !== currentCategory)
    );
  };
  const deleteCategory = () => {
    setCategories((prev) =>
      prev.filter((category) => category !== currentCategory)
    );
    setTodos((prev) =>
      prev.filter((todo) => todo.category !== currentCategory)
    );
    setCurrentCategory(
      categories[0] === currentCategory ? categories[1] : categories[0]
    );
  };
  return (
    <Container>
      <Button onClick={deleteAll}>리스트 전체 삭제</Button>
      <Button onClick={deleteCategory}>현재 카테고리 삭제</Button>
    </Container>
  );
}

export default DeleteBtns;
