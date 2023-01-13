import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoCategory, toDoState } from "../atoms";
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
    border-color: #00b894;
  }
`;
const ErrorMessage = styled.span<{ message: string | undefined }>`
  position: absolute;
  display: ${(props) => (props.message ? "block" : "none")};
  top: -54px;
  left: 10px;
  font-size: 16px;
  background-color: white;
  border: 3px solid #00b894;
  padding: 12px 18px;
  border-radius: 20px;
  border-bottom-left-radius: 0;
`;

const SaveBtn = styled.button`
  border: none;
  background-color: #00b894;
  border-radius: 10px;
  padding: 15px 22px;
  color: white;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #55efc4;
  }
`;

function CreateTodo() {
  const setTodos = useSetRecoilState(toDoState);
  const category = useRecoilValue(toDoCategory);
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
          {...register("todo", { required: "내용을 입력하세요" })}
          placeholder={category + "에 추가할 내용을 입력하세요"}
        />
        <SaveBtn>
          <i className="fa-solid fa-paper-plane fa-lg"></i>
        </SaveBtn>
      </Form>
    </>
  );
}

export default CreateTodo;
