import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Alert, Spinner } from 'react-bootstrap'

import TasksList from '../../components/Tasks/TasksList'
import { fetchTasks, getTasksError, getTasksLoading } from './tasksSlice'
import { getUser } from '../user/userSlice'
import AddNewTaskInput from '../../components/Tasks/AddNewTaskInput'

export default function Tasks() {
  const dispatch = useDispatch()
  const { access_token } = useSelector(getUser)
  const responseError = useSelector(getTasksError)
  const tasksLoading = useSelector(getTasksLoading)

  useEffect(() => {
    dispatch(fetchTasks(access_token))
  }, [])

  return (
    <>
      {responseError ? (
        <Alert variant="warning">{responseError}</Alert>
      ) : (
        <>
          {tasksLoading === 'pending' ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : (
            <>
              <AddNewTaskInput />
              <TasksList />
            </>
          )}
        </>
      )}
    </>
  )
}
