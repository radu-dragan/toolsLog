import _ from 'lodash'
import React from 'react'
import { useBarcode } from 'react-barcodes'
import { Link } from 'react-router-dom'
import { cmToL } from './units_convertor'

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
    // 0 | simple Line
    case 'title':
    case 'description':
    case 'fullName':
    case 'note':
    case 'monthlyUse':
    case 'type':
    case 'EaseOfUse':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>{props.cardData}</p>
        </Line>
      )

    // 1 | simple link Line
    case 'storage':
    case 'purchaseDate':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>
            <Link
              to={`../${props.title}/${props.cardData}`}
              className="link-unstyled"
            >
              {props.cardData}
            </Link>
          </p>
        </Line>
      )
    case 'category':
    case 'subTools':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>
            {_.get(props, 'cardData', []).map((key: string) => (
              <Link
                to={`/${props.title}/${encodeURIComponent(key)}`}
                className="link-unstyled"
                key={key}
              >
                {key}
                <span className="spacing-element">&nbsp;|&nbsp;</span>
              </Link>
            ))}
          </p>
        </Line>
      )
    case 'state':
    case 'score':
      const dataO: string[] = []
      const superData = _.get(props, 'cardData', {})
      Object.keys(superData).forEach((x) => {
        if (superData[x]) {
          dataO.push(`${x}: ${superData[x]}`)
        }
      })
      return (
        <Line title={props.title} show={!!dataO.length}>
          <p>{dataO.join(' | ')}</p>
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
    case 'externalLink':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>
            <a href={props.cardData}>{props.cardData}</a>
          </p>
        </Line>
      )

    case 'weight':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>{props.cardData} g</p>
        </Line>
      )

    case 'size':
      const sizeSplit = props.cardData.split('x') || []
      return (
        <Line title={props.title} show={!!props.cardData}>
          <p>
            {sizeSplit.length === 3 && (
              <>{cmToL(sizeSplit)}&nbsp;L&nbsp;|&nbsp;</>
            )}
            {props.cardData}&nbsp;cm
          </p>
        </Line>
      )
    case 'compatibleWith':
    case 'usesConsumable':
      return (
        <Line title={props.title} show={!!props.cardData}>
          {props.cardData &&
            props.cardData.map((id: string) => (
              <p>
                <Link to={`/${id}`} className="link-unstyled">
                  {id}
                </Link>
              </p>
            ))}
        </Line>
      )
    case 'power':
      return (
        <Line title={props.title} show={!!props.cardData}>
          <Link to={`/${props.cardData}`} className="link-unstyled">
            {props.cardData}
          </Link>
        </Line>
      )
    case 'EAN':
      return (
        <Line title={props.title} show={!!props.cardData}>
          {props.cardData.map((id: string) => (
            <svg
              ref={
                useBarcode({
                  value: id,
                  options: {
                    background: 'transparent',
                  },
                }).inputRef
              }
            />
          ))}
        </Line>
      )
    case 'pinterest':
    case 'media':
      return null
    default:
      return (
        <Line title={props.title}>
          <p>{JSON.stringify(props.cardData)}</p>
        </Line>
      )
  }
}
