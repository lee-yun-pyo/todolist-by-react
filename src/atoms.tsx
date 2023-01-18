import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
});

export const toDoCategory = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "todo",
  default: [],
});

export const toDoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(toDoState);
    const category = get(toDoCategory);
    return todos.filter((todo) => todo.category === category);
  },
});

export const AddListModalState = atom<boolean>({
  key: "addListModal",
  default: false,
});
