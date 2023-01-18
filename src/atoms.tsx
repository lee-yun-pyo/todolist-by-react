import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoCategory = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "todo",
  default: [],
});

export const boardState = atom({
  key: "board",
  default: {},
});

export const toDoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(toDoState);
    const category = get(toDoCategory);
    if (category === Categories.TO_DO)
      return todos.filter((todo) => todo.category === category);
    if (category === Categories.DOING)
      return todos.filter((todo) => todo.category === category);
    if (category === Categories.DONE)
      return todos.filter((todo) => todo.category === category);
  },
});

export const AddListModalState = atom<boolean>({
  key: "addListModal",
  default: false,
});
