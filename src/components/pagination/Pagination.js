import React from 'react'
import PropTypes from 'prop-types'
import './pagination.scss'
import { useSelector } from 'react-redux'
import { selectPage } from '../../store/characterSlice'

function Pagination({ charactersPerPage, totalCharacters, paginate }) {
  const page = useSelector(selectPage)
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={page === number ? "page-item disabled" : "page-item"} onClick={() => paginate(number)}>
            <button disabled={page === number} onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  charactersPerPage: PropTypes.number,
  totalCharacters: PropTypes.number,
  paginate: PropTypes.func
};

export default Pagination
