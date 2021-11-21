import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { AddBar } from '../components/landing_page_bar'
import { Peagboard } from '../components/peagboard'
import { Pinterest } from '../components/pinterest'
import { ItemFactory } from '../components/ToolItemFactoryFunction'
import { selectTool } from '../components/toolWorker'

// const toolData = require('../toolData/tools.json')

interface ToolPath {
  toolId: string
}
export const ToolID: React.FC = () => {
  const dispatch = useDispatch()
  const storeData = useSelector((state) => state) as any
  const { toolId } = useParams<ToolPath>()
  const toolDataRaw = selectTool(toolId, storeData)
  const placeholder = toolDataRaw?.pinterest
  const offset: number = placeholder ? 4 : 0
  if (!toolDataRaw) {
    // redirect
    window.location.pathname = ''
  }

  const add: boolean = (() => {
    return Object.keys(storeData.logTools).indexOf(toolId) === -1
  })()

  useEffect(() => {
    document.title = [toolDataRaw.title, toolId].join(' | ')
  }, [])

  return (
    <Fragment>
      <AddBar />
      <div className="container">
        <Link className="container-back" to="./">
          &lsaquo;
        </Link>
        <div className="row">
          <div className="col">
            <div
              className="AddBtn"
              onKeyPress={() => {}}
              role="button"
              tabIndex={0}
              data-qa="increment-counter"
              onClick={() => {
                if (add) {
                  dispatch({
                    type: 'ADD_ITEM',
                    item: { [toolId]: { id: toolId } },
                  })
                } else {
                  dispatch({
                    type: 'REMOVE_ITEM',
                    item: toolId,
                  })
                }
              }}
            >
              {add ? '+' : '-'}
            </div>
            <h1 className={`offset-md-${offset}`}>{toolDataRaw.title}</h1>
            <h2 className={`offset-md-${offset}`}>{toolId}</h2>
          </div>
        </div>
        <div className="row">
          <hr className="mt-5 mb-5" />

          <Pinterest id={placeholder} offset={offset} />

          <dl className={`col-${12 - offset}`}>
            {Object.keys(toolDataRaw).map((key) => (
              <Fragment key={key}>
                <ItemFactory cardData={toolDataRaw[key]} title={key} />
              </Fragment>
            ))}
          </dl>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <hr className="mt-5 mb-5" />
            <Peagboard
              structure={toolDataRaw.dimensions}
              elementSize={toolDataRaw.dimensions}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
