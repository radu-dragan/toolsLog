import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const LandingRow: React.FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  const dispatch = useDispatch()
  const storeData = useSelector((state) => state) as any
  const add: boolean = (() => {
    return Object.keys(storeData.logTools).indexOf(id) === -1
  })()

  return (
    <li className={[add ? 'A' : 'B', 'list-group-item'].join(' ')}>
      <Link to={id} className="link-unstyled">
        <>{[id, title].join(' | ')}</>
      </Link>
      <span
        className={[add ? 'add' : 'remove', 'float-right', 'inline-plus'].join(
          ' '
        )}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          console.error(e)
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (add) {
            dispatch({
              type: 'ADD_ITEM',
              item: { [id]: { id } },
            })
          } else {
            dispatch({
              type: 'REMOVE_ITEM',
              item: id,
            })
          }
        }}
      >
        <span>+</span>
      </span>
    </li>
  )
}
