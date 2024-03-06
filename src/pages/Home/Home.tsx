import { Fragment, useEffect, useState } from "react"
import { Button, TextField } from "@mui/material"

import { createToDo } from "../../store/todoSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import ToDo from "../../components/Todo/Todo"
import CustomSelect from "../../components/Select/Select"

import type { SelectChangeEvent } from "@mui/material"
import type { ChangeEvent, FC } from "react"

import styles from "./styles.module.css"

const Home: FC = () => {
  const [text, changeText] = useState("")
  const [maxLength, changeMaxLength] = useState(100)
  const [filter, changeFilter] = useState<undefined | string>(undefined)

  const dispatch = useAppDispatch()
  const { todos } = useAppSelector(state => state.todos)

  useEffect(() => {
    if (text.length > maxLength) changeText(text.substring(0, maxLength))
  }, [maxLength, text])

  const onAddNew = (): void => {
    dispatch(
      createToDo({
        value: text,
        status: "notcompleted",
        id: +new Date(),
      }),
    )
    changeText("")
  }

  const onChangeFilter = (event: SelectChangeEvent): void => {
    changeFilter(event.target.value)
  }

  const onChangeText = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= maxLength) changeText(event.target.value)
  }

  const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>): void => {
    changeMaxLength(Number(event.target.value))
  }

  return (
    <Fragment>
      <h1 className={styles.Header}>TODO LIST:</h1>

      <div className={styles.HomePage}>
        <div className={styles.AddNew}>
          <div className={styles.TextField}>
            <div className={styles.MaxIndicator}>
              {text.length}/{maxLength}
            </div>

            <TextField
              multiline
              className={styles.TextField}
              rows={4}
              value={text}
              onChange={onChangeText}
              fullWidth
              defaultValue=""
            />
          </div>

          <Button
            variant="outlined"
            fullWidth
            onClick={onAddNew}
            disabled={text.length === 0}
          >
            Add new
          </Button>
        </div>

        <div className={styles.FilterBar}>
          <TextField
            size="small"
            type="number"
            label="Max length"
            value={maxLength}
            onChange={onChangeMaxLength}
          />

          <CustomSelect value={filter} change={onChangeFilter} />
        </div>

        {todos.length > 0 && 
          <div className={styles.List}>
            {todos
              .filter(el => filter ? el.status === filter : el)
              .map(el => <ToDo data={el} key={el.id} />)}
          </div>
        }

        <div className={styles.StatusBar}>
          Tasks: {todos.length} | Not completed:{" "}
          {todos.filter(el => el.status === "notcompleted").length} | Completed:{" "}
          {todos.filter(el => el.status === "completed").length}
        </div>
      </div>
    </Fragment>
  )
}

export default Home
