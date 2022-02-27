import React from 'react'

export interface ColProps {
  x: number
  y: number
  w: number
  h: number
}

export interface RowProps {
  data: ColProps
  addCol: any
  addRow: any
}

export const AddCircle: React.FC<any> = (props) => {
  const { x, y, d } = props
  const { event, text } = props
  return (
    <>
      <circle
        cx={x + d}
        cy={y + d}
        r={d}
        onClick={event}
        fill="transparent"
        stroke="black"
        strokeWidth="0.1"
      />
      <text x={x + d * 0.52} y={y + d * 1.7} className="svg-icon-text">
        {text}
      </text>
    </>
  )
}

const ShowData: React.FC<any> = (props) => {
  const { x, y, text } = props

  return (
    <text x={x} y={y} className="svg-descriptive-text" dy="0">
      {text.map((rowText: any) => (
        <tspan x={x} dy="1.3">
          {JSON.stringify(rowText)}
        </tspan>
      ))}
    </text>
  )
}

export const Row: React.FC<any> = (props) => {
  const { data } = props
  return (
    <>
      {Object.values(data).map((rowItem: any) => (
        <>
          <rect
            x={rowItem.x}
            y={rowItem.y}
            width={rowItem.w}
            height={rowItem.h}
            fill="transparent"
            stroke="black"
            strokeWidth="0.2"
          />

          <AddCircle
            x={rowItem.x + 2}
            y={rowItem.y + rowItem.h / 2}
            d={1}
            event={props.addCol}
            text="+"
          />

          <AddCircle
            x={rowItem.x - 2 + rowItem.w / 2}
            y={rowItem.y + rowItem.h - 2 * 2}
            d={1}
            event={props.addRow}
            text="+"
          />

          <ShowData text={rowItem.planks} x={rowItem.x + 1} y={rowItem.y + 1} />
        </>
      ))}
    </>
  )
}
