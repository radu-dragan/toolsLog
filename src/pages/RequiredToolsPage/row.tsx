import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// export const RequiredRow: React.FC<{
//   title: string
//   id: string
//   units?: number
// }> = ({ title, id, units }) => {
//   const dispatch = useDispatch()
//   return (
//     <li className="list-group-item">
//       <Link to={id} className="link-unstyled">
//         <>
//           {[units ? `${units} BUC` : null, id, title]
//             .filter((e) => e)
//             .join(' | ')}
//         </>
//       </Link>
//       <span
//         className="remove-btn"
//         onKeyPress={() => {}}
//         onClick={() => {
//           dispatch({
//             type: 'REMOVE_ITEM',
//             item: id,
//           })
//         }}
//         role="button"
//         tabIndex={0}
//       >
//         -
//       </span>
//     </li>
//   )
// }

const Units: React.FC<{ units?: string; nrItems?: number }> = ({
  nrItems = 1,
  units,
}) => {
  if (!units || +nrItems < 1) {
    return null
  }
  return (
    <>
      {nrItems}&nbsp;
      {units}&nbsp;|&nbsp;
    </>
  )
}

const Add: React.FC<{ id: string; nrItems?: number }> = ({
  id,
  nrItems = 0,
}) => {
  const dispatch = useDispatch()
  return (
    <span
      className="btn btn-outline-secondary add-btn"
      onKeyPress={() => {}}
      onClick={() => {
        dispatch({
          type: 'ADD_ITEM_OPTION',
          item: { id, count: nrItems + 1 },
        })
      }}
      role="button"
      tabIndex={0}
    >
      +
    </span>
  )
}

const Remove: React.FC<{ id: string; nrItems?: number }> = ({
  id,
  nrItems = 0,
}) => {
  const dispatch = useDispatch()
  return (
    <span
      className="btn btn-outline-secondary remove-btn"
      onKeyPress={() => {}}
      onClick={() => {
        if (nrItems <= 1) {
          dispatch({
            type: 'REMOVE_ITEM',
            item: id,
          })
        } else {
          dispatch({
            type: 'ADD_ITEM_OPTION',
            item: { id, count: nrItems - 1 },
          })
        }
      }}
      role="button"
      tabIndex={0}
    >
      -
    </span>
  )
}

const AddRemoveBtn: React.FC<{
  id: string
  nrItems?: number
  nonIteratable?: boolean
}> = (props) => {
  const { nrItems = 2, nonIteratable = false } = props
  if (nonIteratable) {
    return (
      <div className="add-remove-btn-group btn-group">
        {nrItems > 0 ? <Remove {...props} /> : <Add {...props} />}
      </div>
    )
  }
  return (
    <div className="add-remove-btn-group btn-group">
      <Add {...props} />
      {nrItems > 0 && <Remove {...props} />}
    </div>
  )
}

export const RequiredRowNew: React.FC<{
  title: string
  id: string
  nrItems?: number
  units: string
  nonIteratable?: any
}> = ({ title, id, nrItems = 0, units, nonIteratable }) => {
  return (
    <li className={['list-group-item', +nrItems < 1 ? 'A' : 'B'].join(' ')}>
      <Link to={`/${id}`} className="link-unstyled">
        <>
          <Units nrItems={nrItems} units={units} />
          {[id, title].filter((e) => e).join(' | ')}
        </>
      </Link>
      <AddRemoveBtn id={id} nrItems={nrItems} nonIteratable={nonIteratable} />
    </li>
  )
}
