import React, { Fragment, useEffect } from 'react'
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
  const offset:number = 12

  useEffect(() => {
    document.title = [toolDataRaw.title, toolId].join(' | ')
  }, [])

  return (
    <Fragment>
      <h1 className="offset-md-4">{toolDataRaw.title}</h1>
      <h2 className="offset-md-4">{toolId}</h2>
      <div className="row">
        <hr />

        <div className="col-4">
          <iframe
            title="This is a unique title"
            src="https://assets.pinterest.com/ext/embed.html?id=509680882819900768"
            height="616"
            width="345"
            scrolling="no"
          />
        </div>
        <dl className="col-8">
          {Object.keys(toolDataRaw).map((key) => (
            <Fragment key={key}>
              <ItemFactory cardData={toolDataRaw[key]} title={key} />
            </Fragment>
          ))}
        </dl>
      </div>
    </Fragment>
  )
}
