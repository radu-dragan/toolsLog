import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export const RequiredRow: React.FC<{
  title: string
  id: string
  units?: number
}> = ({ title, id, units }) => {
  const dispatch = useDispatch()
  return (
    <li className="list-group-item">
      <Link to={id} className="link-unstyled">
        <>
          {[units ? `${units} BUC` : null, id, title].filter((e) => e).join(' | ')}
        </>
      </Link>
      <span
        className="remove-btn"
        onKeyPress={() => {}}
        onClick={() => {
          dispatch({
            type: 'REMOVE_ITEM',
            item: id,
          })
        }}
        role="button"
        tabIndex={0}
      >
        -
      </span>
    </li>
  )
}
