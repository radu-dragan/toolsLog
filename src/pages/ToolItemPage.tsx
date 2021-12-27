import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { isConsumable } from '../components/isHelper'
import { AddBar } from '../components/landing_page_bar'
import { Peagboard } from '../components/peagboard'
import { Pinterest } from '../components/pinterest'
import { ItemFactory } from '../components/ToolItemFactoryFunction'
import { selectTool } from '../components/toolWorker'

// document.getElementsByClassName("no-data").length;
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

  const AddBTN: React.FC = () => (
    <div
      className="AddBtn"
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
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
  )

  const Options: React.FC = () => (
    <div
      className="btn btn-outline-secondary"
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
      onClick={() => {
        dispatch({
          type: 'ADD_ITEM_OPTION',
          item: { id: toolId, optional: true },
        })
      }}
    >
      Optional
    </div>
  )

  const countItems = (() => {
    if (add) {
      return 0
    }
    if (storeData.logTools[toolId].count) {
      return +storeData.logTools[toolId].count
    }
    return 1
  })()

  const ObtionsGroup: React.FC = () => (
    <div id="options-btn">
      <div
        className="btn-group mr-2 mt-3"
        role="group"
        aria-label="First group"
      >
        <Options />
        <button type="button" className="btn btn-outline-secondary">
          L
        </button>
        <button type="button" className="btn btn-outline-secondary">
          I
        </button>
      </div>
    </div>
  )

  const CountGroup: React.FC = () => {
    if (isConsumable(toolId)) {
      return (
        <div id="options-btn">
          <div
            className="btn-group mr-2 mt-3"
            role="group"
            aria-label="First group"
          >
            <div
              className="btn btn-outline-secondary"
              onKeyPress={() => {}}
              role="button"
              tabIndex={0}
              onClick={() => {
                dispatch({
                  type: 'ADD_ITEM_OPTION',
                  item: { id: toolId, count: countItems + 1 },
                })
              }}
            >
              +
            </div>
            <button type="button" className="btn btn-outline-secondary">
              {countItems}
            </button>
            <div
              className="btn btn-outline-secondary"
              onKeyPress={() => {}}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (countItems <= 1) {
                  dispatch({
                    type: 'REMOVE_ITEM',
                    item: toolId,
                  })
                } else {
                  dispatch({
                    type: 'ADD_ITEM_OPTION',
                    item: { id: toolId, count: countItems - 1 },
                  })
                }
              }}
            >
              -
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Fragment>
      <AddBar />
      <div className="container">
        <Link className="container-back" to="./">
          &lsaquo;
        </Link>
        <div className="row">
          <div className="col">
            <AddBTN />

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

          {!!countItems && (
            <>
              <ObtionsGroup />
              <CountGroup />
            </>
          )}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <hr className="mt-5 mb-5" />
            <Peagboard
              storage={toolDataRaw.storage}
              size={toolDataRaw.size}
              position={toolDataRaw.position}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
