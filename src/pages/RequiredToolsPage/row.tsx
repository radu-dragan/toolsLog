import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export const RequiredRow: React.FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  const dispatch = useDispatch()
  return (
    <li className="list-group-item">
      <Link to={id} className="link-unstyled">
        <>{[id, title].join(' | ')}</>
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
