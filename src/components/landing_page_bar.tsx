/* eslint-disable no-restricted-syntax */
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isConsumable } from './isHelper'
// import './landing_page_bar.scss'

export const AddBar: React.FC = () => {
  const storeData = useSelector((state) => state) as any

  const data = (() => {
    const displayArray: any = Object.entries(storeData.logTools)
      .sort()
      .map((val) => {
        const value: any = val[1]
        const options = Object.keys(_.omit(value, ['id']))
          .sort()
          .map((i) => {
            switch (i) {
              case 'count':
                if (isConsumable(value.id)) {
                  return `${value.count}Buc`
                }
                return ''
              default:
                return value[i] ? i : ''
            }
          })
        options.unshift(value.id)
        return options.filter((x) => x).join(' ')
      })

    return displayArray
  })()

  if (data.length === 0) {
    return null
  }
  // we need a decode function
  return (
    <Link to="/requiredItems" className="add-bar link-unstyled">
      Tools in cart: {data.join(' | ')}
    </Link>
  )
}
