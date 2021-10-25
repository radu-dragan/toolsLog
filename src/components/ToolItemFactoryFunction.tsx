import React from 'react'

export const ItemFactory: React.FC<any> = (props) => {
  console.log(props)
  switch (props.title) {
    case 'title':
    case 'description':
      return <p>{props.cardData}</p>

    default:
      return <p>B</p>
  }
}
