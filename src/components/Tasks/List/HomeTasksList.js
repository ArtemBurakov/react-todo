import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Row, ListGroup } from 'react-bootstrap'

import TaskItem from './TaskItem'
import LoadingTasksList from './LoadingTasksList'

import {
  getFetchTasksLoading,
  getTasks,
} from '../../../features/tasks/tasksSlice'

export default function HomeTasksList({ maxTasks }) {
  const tasks = useSelector(getTasks)
  const fetchTasksLoading = useSelector(getFetchTasksLoading)

  const filteredData = useMemo(() => {
    const data = tasks
      .filter((task) => task.status !== 0)
      .sort((a, b) => b.updated_at - a.updated_at)
      .sort((a, b) => a.status - b.status)

    return data.slice(0, maxTasks)
  }, [tasks])

  return (
    <>
      {filteredData.length > 0 && (
        <Row>
          <Link className="link-title" to="tasks">
            TASKS
          </Link>
          {fetchTasksLoading === 'pending' ? (
            <LoadingTasksList numberOfTasks={maxTasks} />
          ) : (
            <ListGroup className="list-group-flush">
              {filteredData?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ListGroup>
          )}
        </Row>
      )}
    </>
  )
}
