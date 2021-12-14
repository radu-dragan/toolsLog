import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const AddBar: React.FC = () => {
  const storeData = useSelector((state) => state) as any

  const data = Object.keys(storeData.logTools)

  if (data.length === 0) {
    return null
  }
  // we need a decode function
  return (
    <Link to="/requiredItems" className="add-bar link-unstyled">
      Tools in cart: {data.sort().join(' | ')}
    </Link>
  )
}
