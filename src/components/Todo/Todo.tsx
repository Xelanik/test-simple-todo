import classNames from "classnames"
import { Button } from "@mui/material"

import { useAppDispatch } from "../../app/hooks"
import { changeStatusToDo, deleteToDo } from "../../store/todoSlice"

import type { FC } from 'react'
import type { ToDo as ToDoType } from "../../store/todoSlice"

import styles from "./styles.module.css"

type Props = {
  data: ToDoType
}

const ToDo: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch()

  const onChangeStatus = ():void => {
    dispatch(changeStatusToDo(data.id))
  }

  const onDeleteToDo = ():void => {
    dispatch(deleteToDo(data.id))
  }

  return (
    <div
      className={classNames(styles.ToDo, {
        [styles.Done]: data.status === "completed",
      })}
    >
      <div className={styles.Title} onClick={onChangeStatus}>
        {data.value}
      </div>

      <Button variant="outlined" color="error" onClick={onDeleteToDo}>
        Delete
      </Button>
    </div>
  )
}

export default ToDo
