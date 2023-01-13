import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoCategory, toDoState } from "../atoms";

interface IForm {
  todo: string;
}

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("todo", { required: "입력하세요" })}
        placeholder="ID"
      />
      <span>{errors?.todo?.message}</span>
      <button>Save</button>
    </form>
  );
}

export default CreateTodo;
