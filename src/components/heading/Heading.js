import React from 'react'
import PropTypes from 'prop-types'
import './heading.scss'

function Heading({ children, level }) {
  return (
    <>
      {level === 1 && <h1>{children}</h1>}
      {level === 2 && <h2>{children}</h2>}
    </>
  )
}

Heading.defaultProps = {
  level: 1
}

Heading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number
};

export default Heading
