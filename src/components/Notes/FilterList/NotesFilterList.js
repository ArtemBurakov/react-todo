import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Accordion } from 'react-bootstrap'

import FilterListItem from './FilterListItem'

import {
  getSelectedWorkspace,
  getWorkspaces,
  removeSelectedWorkspace,
  setSelectedWorkspace,
} from '../../../features/workspaces/workspacesSlice'
import {
  getNotesActiveFilterListItem,
  getNotesFilterList,
  setNotesActiveFilterListItem,
  setNotesActiveFilterStatus,
} from '../../../features/notes/notesSlice'

export default function NotesFilterList({ onListItemSelect, flush = false }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const workspaces = useSelector(getWorkspaces)
  const selectedWorkspace = useSelector(getSelectedWorkspace)
  const notesFilterList = useSelector(getNotesFilterList)
  const notesActiveFilterListItem = useSelector(getNotesActiveFilterListItem)

  const filterList = useMemo(
    () => ({
      notes: notesFilterList,
      workspaces:
        selectedWorkspace && location.pathname !== '/notes'
          ? null
          : workspaces
              .filter(({ status }) => status === 10)
              .sort((a, b) => b.updated_at - a.updated_at),
    }),
    [notesFilterList, selectedWorkspace, workspaces]
  )

  const selectHandler = (item) => {
    if (location.pathname === '/notes') {
      if (item?.id) dispatch(setSelectedWorkspace(item))
      else if (selectedWorkspace !== null) dispatch(removeSelectedWorkspace())
    }

    dispatch(setNotesActiveFilterListItem(item))
    dispatch(setNotesActiveFilterStatus(item.status))

    if (onListItemSelect !== undefined) onListItemSelect()
  }

  return (
    <div className="accordion-container">
      <Accordion defaultActiveKey={['0', '1']} alwaysOpen flush={flush}>
        <FilterListItem
          title="Notes"
          data={filterList.notes}
          onSelect={selectHandler}
          activeFilter={notesActiveFilterListItem}
          eventKey="0"
        />
        <FilterListItem
          title="Workspaces"
          data={filterList.workspaces}
          onSelect={selectHandler}
          activeFilter={notesActiveFilterListItem}
          eventKey="1"
        />
      </Accordion>
    </div>
  )
}
