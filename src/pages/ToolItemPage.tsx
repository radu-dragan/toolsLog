import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { ItemFactory } from '../components/ToolItemFactoryFunction'
import { retriveTool } from '../components/toolWorker'

const toolData = require('../toolData/tools.json')

interface ToolPath {
  toolId: string
}
export const ToolID: React.FC = () => {
  const { toolId } = useParams<ToolPath>()
  const toolDataRaw = retriveTool(toolId, toolData)

  return (
    <Fragment>
      <h1>{toolDataRaw.title}</h1>
      <h2>{toolId}</h2>
      <hr />
      <dl className="row">
        {Object.keys(toolDataRaw).map((key) => (
          <Fragment key={key}>
            <dt className="font-weight-bold" >{key}</dt>
            <ItemFactory cardData={toolDataRaw[key]} title={key} />
          </Fragment>
        ))}
      </dl>
    </Fragment>
  )
}
