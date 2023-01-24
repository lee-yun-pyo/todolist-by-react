import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoriesState, selectedCategoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  todo: string;
}

const Form = styled.form`
  display: flex;
  margin-bottom: 30px;
  position: relative;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
  border: none;
  margin-right: 7px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  width: 400px;
  &:focus {
    outline: none;
    border-color: #273c75;
  }
  @media (max-width: 420px) {
    font-size: 15px;
  }
`;
const ErrorMessage = styled.span<{ message: string | undefined }>`
  position: absolute;
  display: ${(props) => (props.message ? "block" : "none")};
  top: -54px;
  left: 10px;
  font-size: 16px;
  background-color: white;
  border: 3px solid #273c75;
  padding: 12px 18px;
  border-radius: 20px;
  border-bottom-left-radius: 0;
  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

const SaveBtn = styled.button`
  border: none;
  background-color: #273c75;
  border-radius: 10px;
  padding: 15px 22px;
  color: white;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #40739e;
  }
`;

function CreateTodo() {
  const categories = useRecoilValue(categoriesState);
  const setTodos = useSetRecoilState(toDoState);
  const category = useRecoilValue(selectedCategoryState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = (data: any) => {
    setTodos((oldTodos) => [
      { text: data.todo, id: Date.now(), category },
      ...oldTodos,
    ]);
    setValue("todo", "");
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage message={errors.todo?.message}>
          {errors?.todo?.message}
        </ErrorMessage>
        <Input
          {...register("todo", {
            required: "내용을 입력하세요",
            disabled: categories.length === 0 ? true : false,
          })}
          placeholder={
            categories.length === 0
              ? "카테고리를 추가해주세요"
              : category + "에 추가할 내용을 입력하세요"
          }
          disabled={categories.length === 0}
        />
        <SaveBtn disabled={categories.length === 0}>
          <i className="fa-solid fa-paper-plane fa-lg"></i>
        </SaveBtn>
      </Form>
    </>
  );
}

export default CreateTodo;
