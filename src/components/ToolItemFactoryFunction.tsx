import _ from 'lodash'
import React from 'react'

const formatTitle = (string: string) => {
  let self: string = string
  self = self.replaceAll(/([a-z])([A-Z])/g, '$1 $2')
  self = self.charAt(0).toUpperCase() + self.slice(1)
  return self
}

const Line: React.FC<{ title: string; show?: boolean }> = (props) => {
  const { title, children, show = true } = props

  if (!show) {
    return null
  }
  return (
    <>
      <dt className="font-weight-bold">{formatTitle(title)}</dt>
      {children}
    </>
  )
}

export const ItemFactory: React.FC<{
  cardData: any
  title: string
}> = (props) => {
  switch (props.title) {
    case 'title':
    case 'description':
    case 'fullName':
    case 'note':
    case 'monthlyUse':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>{props.cardData}</p>
        </Line>
      )
    case 'category':
    case 'subTools':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>{_.get(props, 'cardData', []).join(' | ')}</p>
        </Line>
      )
    case 'bothFrom':
      const data = Object.values(_.get(props, 'cardData', {}))
        .filter((x) => x)
        .join(' | ')
      return (
        <Line title={props.title} show={!!data}>
          <p>{data}</p>
        </Line>
      )
    case 'ExteralLink':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>
            <a href={props.cardData}>{props.cardData}</a>
          </p>
        </Line>
      )

    default:
      return (
        <Line title={props.title}>
          <p>x</p>
        </Line>
      )
  }
}
