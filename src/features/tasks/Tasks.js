import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Alert } from 'react-bootstrap'

import TasksList from '../../components/Tasks/TasksList'
import AddNewTaskInput from '../../components/Tasks/AddNewTaskInput'
import LoadingTasksList from '../../components/Tasks/LoadingTasksList'

import { getUser } from '../user/userSlice'
import { fetchTasks, getTasksError, getFetchTasksLoading } from './tasksSlice'

export default function Tasks() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const responseError = useSelector(getTasksError)
  const fetchTasksLoading = useSelector(getFetchTasksLoading)

  useEffect(() => {
    dispatch(fetchTasks(access_token))
  }, [])

  if (responseError)
    return (
      <>
        <h4>Your todo list</h4>
        <Alert variant="warning">{responseError}</Alert>
      </>
    )

  return (
    <>
      <h4>Your todo list</h4>
      <AddNewTaskInput />
      {fetchTasksLoading === 'pending' ? <LoadingTasksList /> : <TasksList />}
    </>
  )
}
