import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { usePagination, DOTS } from '../../hooks/usePagination'

const CustomPagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) return null

  const onNext = () => onPageChange(currentPage + 1)

  const onPrevious = () => onPageChange(currentPage - 1)

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <Pagination className="mt-3 mb-0">
      <Pagination.Prev disabled={currentPage === 1} onClick={onPrevious} />
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) return <Pagination.Ellipsis />

        return (
          <Pagination.Item
            active={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        )
      })}
      <Pagination.Next disabled={currentPage === lastPage} onClick={onNext} />
    </Pagination>
  )
}

export default CustomPagination
