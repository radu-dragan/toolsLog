import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ItemFactory } from '../components/ToolItemFactoryFunction'
import { selectTool } from '../components/toolWorker'

// const toolData = require('../toolData/tools.json')

interface ToolPath {
  toolId: string
}
export const ToolID: React.FC = () => {
  const storeData = useSelector((state) => state)
  const { toolId } = useParams<ToolPath>()
  const toolDataRaw = selectTool(toolId, storeData)

  // console.log("toolStore",storeData)
  return (
    <Fragment>
      <h1>{toolDataRaw.title}</h1>
      <h2>{toolId}</h2>
      <hr />
      <dl className="row">
        {Object.keys(toolDataRaw).map((key) => (
          <Fragment key={key}>
            <ItemFactory cardData={toolDataRaw[key]} title={key} />
          </Fragment>
        ))}
      </dl>
    </Fragment>
  )
}
