import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const [todos, setTodos] = useRecoilState(toDoState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = (data: any) => {
    setTodos((oldTodos) => [
      { text: data.todo, id: Date.now(), category: "TO_DO" },
      ...oldTodos,
    ]);
    setValue("todo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("todo", { required: "입력해라" })}
          placeholder="ID"
        />
        <span>{errors?.todo?.message}</span>
        <button>Save</button>
      </form>
    </>
  );
}

export default CreateTodo;
