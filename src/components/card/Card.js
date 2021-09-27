import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setDetailsLoading } from '../../store/characterSlice'

import './card.scss'

function Card({ id, img, name }) {
  const dispatch = useDispatch()

  return (
    <Link
      to={`/character/${id}`}
      onClick = { () => dispatch(setDetailsLoading())}
    >
      <div className="card" >
        <img src={img} alt={name} height='300' width='225' />
        <div className="card-name">{name}</div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string
};

export default Card
