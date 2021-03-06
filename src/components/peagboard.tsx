import React from 'react'
import { useSelector } from 'react-redux'
import { selectTool } from './toolWorker'

export const Peagboard: React.FC<{
  storage: any
  size: any
  position: any
}> = ({ storage, size, position }) => {
  if (!storage || !size || !position) {
    return null
  }

  const storeData = useSelector((state) => state)
  const soridgeData = selectTool(storage, storeData)

  const elementWidth =
    soridgeData.details.holeSize + soridgeData.details.holeDistance
  const width = soridgeData.details.size[0]
  const height = soridgeData.details.size[1]

  const widthItems = (() => {
    const items = []
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < Math.floor(width / elementWidth); i++) {
      items.push(i * elementWidth)
    }
    return items
  })()

  const heightItems = (() => {
    const items = []
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < Math.floor(height / elementWidth); i++) {
      items.push(i * elementWidth)
    }
    return items
  })()

  return (
    <div className="mb-5">
      <svg className="svg-peagboard" viewBox={`0 0 ${width} ${height}`}>
        {heightItems.map((h) => (
          <>
            {widthItems.map((w) => (
              <circle
                key={w.toString() + h.toString()}
                cx={w}
                cy={h}
                r={soridgeData.details.holeSize / 2}
                stroke="white"
                fill="black"
                // stroke-width="4"
              />
            ))}
          </>
        ))}

        <rect
          x={
            (position[0] + 1) * elementWidth - soridgeData.details.holeSize / 2
          }
          y={
            (position[1] + 1) * elementWidth - soridgeData.details.holeSize / 2
          }
          width={size.split(' x ')[0]}
          height={size.split(' x ')[1]}
        />
      </svg>
    </div>
  )
}
