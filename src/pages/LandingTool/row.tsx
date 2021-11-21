import React from 'react'
import { Link } from 'react-router-dom'

export const LandingRow: React.FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  return (
    <li className="list-group-item">
      <Link to={id} className="link-unstyled">
        <>{[id, title].join(' | ')}</>
      </Link>
    </li>
  )
}
