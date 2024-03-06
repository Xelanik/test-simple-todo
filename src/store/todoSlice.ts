import { createAppSlice } from "../app/createAppSlice"

import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: ITodoSliceState = {
  todos: [],
}

const handleStatusChange = (element: ToDo): ToDo => ({
  ...element,
  status: element.status === "completed" ? "notcompleted" : "completed",
})

export const todosSlice = createAppSlice({
  name: "todos",
  initialState,
  reducers: create => ({
    createToDo: create.reducer((state, action: PayloadAction<ToDo>) => {
      state.todos.push(action.payload)
    }),

    deleteToDo: create.reducer((state, action: PayloadAction<number>) => {
      const copiedArray = [...state.todos]
      state.todos = copiedArray.filter(el => el.id !== action.payload)
    }),

    changeStatusToDo: create.reducer((state, action: PayloadAction<number>) => {
      const copiedArray = [...state.todos]
      state.todos = copiedArray.map(el =>
        action.payload === el.id ? handleStatusChange(el) : el,
      )
    }),
  }),
})

export const { createToDo, deleteToDo, changeStatusToDo } = todosSlice.actions

export type ToDo = {
  id: number
  value: string
  status: "completed" | "notcompleted"
}

export interface ITodoSliceState {
  todos: ToDo[]
}
