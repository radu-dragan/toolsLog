/* eslint-disable no-restricted-syntax */
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
                return `${value.count}Buc`
              default:
                return value[i] ? i : ''
            }
          })
        options.unshift(value.id)
        return options.join(' ')
      })

    // const keysArray = []

    // for (const i of Object.entries(storeData.logTools).sort()) {
    //   let temp = ''
    //   const item: any = i[1]
    //   const q = Object.keys(_.omit(item, ['id']))

    //   temp += item.id

    //   // eslint-disable-next-line no-plusplus
    //   for (let key = 0; key < q.length; key++) {
    //     const option = q[key]
    //     if (item[option]) {
    //       if (option === 'count') {
    //         temp = `${item[option]}x ${temp}`
    //       } else {
    //         temp += ` (${option})`
    //       }
    //     }
    //   }

    //   keysArray.push(temp)
    // }

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
