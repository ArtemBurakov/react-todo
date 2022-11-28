import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { ListGroup } from 'react-bootstrap'

import TaskItem from './TaskItem'
import Pagination from '../../Pagination/Pagination'

import { getTasks } from '../../../features/tasks/tasksSlice'

const TASKS_PER_PAGE = 16

export default function TasksList({ note, type, maxTasks = null }) {
  const tasks = useSelector(getTasks)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * TASKS_PER_PAGE
    const lastPageIndex = firstPageIndex + TASKS_PER_PAGE

    const data = tasks
      .filter(
        (task) => task.note_id === (note?.id || null) && task.status !== 0
      )
      .sort((a, b) => b.updated_at - a.updated_at)
      .sort((a, b) => a.status - b.status)

    return {
      length: data.length,
      data: maxTasks
        ? data.slice(0, maxTasks)
        : data.slice(firstPageIndex, lastPageIndex),
    }
  }, [tasks, currentPage])

  return (
    <>
      <ListGroup className="list-group-flush">
        {filteredData?.data?.map((task) => (
          <TaskItem key={task.id} task={task} type={type} />
        ))}
      </ListGroup>
      <Pagination
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={TASKS_PER_PAGE}
        onPageChange={(page) => {
          window.scrollTo(0, 0)
          setCurrentPage(page)
        }}
      />
    </>
  )
}
