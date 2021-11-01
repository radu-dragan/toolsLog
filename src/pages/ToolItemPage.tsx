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
  const placeholder = toolDataRaw.pinterest
  const offset: number = placeholder ? 4 : 0

  useEffect(() => {
    document.title = [toolDataRaw.title, toolId].join(' | ')
  }, [])

  return (
    <Fragment>
      <div
        className="AddBtn"
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
        onClick={() => {
          console.log('Add Redux 2')
        }}
      >
        +
      </div>
      <h1 className={`offset-md-${offset}`}>{toolDataRaw.title}</h1>
      <h2 className={`offset-md-${offset}`}>{toolId}</h2>
      <div className="row">
        <hr className="mt-5 mb-5" />

        {!!placeholder && (
          <div className={`col-${offset} iframe-container`}>
            <iframe
              title="This is a unique title"
              src={`https://assets.pinterest.com/ext/embed.html?id=${placeholder}`}
              scrolling="no"
            />
          </div>
        )}

        <dl className={`col-${12 - offset}`}>
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
