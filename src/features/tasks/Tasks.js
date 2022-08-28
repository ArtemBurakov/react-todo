import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Alert } from 'react-bootstrap'

import TasksList from '../../components/Tasks/TasksList'
import LoadingTasksList from '../../components/Tasks/LoadingTasksList'
import { fetchTasks, getTasksError, getFetchTasksLoading } from './tasksSlice'
import { getUser } from '../user/userSlice'
import AddNewTaskInput from '../../components/Tasks/AddNewTaskInput'

export default function Tasks() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const responseError = useSelector(getTasksError)
  const fetchTasksLoading = useSelector(getFetchTasksLoading)

  useEffect(() => {
    dispatch(fetchTasks(access_token))
  }, [])

  return (
    <>
      <h4>Your todo list</h4>
      {responseError ? (
        <Alert variant="warning">{responseError}</Alert>
      ) : (
        <>
          <AddNewTaskInput />
          {fetchTasksLoading === 'pending' ? (
            <LoadingTasksList />
          ) : (
            <TasksList />
          )}
        </>
      )}
    </>
  )
}
