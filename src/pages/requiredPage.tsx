/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getToolsPropsValue,
  getTool,
  convertToLiter,
} from '../components/toolWorker'
import { RequiredRowNew } from './RequiredToolsPage/row'
import { Container } from './Skaffolding/container'
import { SItem } from './Skaffolding/sidebarItem'
import { ToolPath } from './StorePage'
import './RequiredToolsPage/style.scss'
import { decodeUrl } from './RequiredToolsPage/requiredDecodeUrl'
import { isConsumable, isTool } from '../components/isHelper'

interface SuperProps {
  data?: any
}

const FormatDecimal: React.FC<{ value: number; unit: string }> = ({
  value,
  unit,
}) => {
  const big = Math.floor(value)
  const small = Math.floor((value - big) * 100)

  return (
    <>
      {big}
      <sup>{small}</sup> {unit}
    </>
  )
}

export const requiredTool: React.FC<SuperProps> = () => {
  const storeData = useSelector((state) => state) as any
  const data: any = Object.keys(storeData.logTools)
  const dataTools = data.filter((e: string) => isTool(e))
  const dataConsumables = data.filter((e: string) => isConsumable(e))
  const dataOther: any = _.difference(data, [...dataConsumables, ...dataTools])

  const dispatch = useDispatch()

  // bombine super props with the item in redux
  // use the decode

  const weight = getToolsPropsValue({
    id: data,
    store: storeData,
    props: 'weight',
  })

  const weightMissingElements = data.length - weight.length
  const weightReduced = weight.reduce((p: any, c: any) => p + +c, 0) / 1000

  const size = getToolsPropsValue({
    id: data,
    store: storeData,
    props: 'size',
  })

  const sizeMissingElements = data.length - size.length
  const sizeReduced = size.reduce((p: any, c: any) => p + convertToLiter(c), 0)

  const buildUrl = (() => {
    const mainSeparator = ';'
    const minSeparator = ','
    const displayArray: any = Object.entries(storeData.logTools)
      .sort()
      .map((val) => {
        const value: any = val[1]
        const options = Object.keys(_.omit(value, ['id']))
          .sort()
          .map((i) => {
            switch (i) {
              case 'count':
                if (isConsumable(value.id)) {
                  return `${value.count}Buc`
                }
                return ''
              default:
                return value[i] ? i : ''
            }
          })
        options.unshift(value.id)
        return options.filter((x) => x).join(minSeparator)
      })

    //
    // eslint-disable-next-line no-restricted-globals
    history.pushState(
      {},
      '',
      `${
        window.location.href.split('/requiredItems')[0]
      }/requiredItems/${displayArray.join(mainSeparator)}`
    )
    return displayArray.join(mainSeparator)
  })()

  const toolId = decodeURIComponent(useParams<ToolPath>().toolId).split(';')

  useEffect(() => {
    decodeUrl({
      data,
      toolId,
      dispatch,
    })
  }, [])

  return (
    <Container
      title="Required Items"
      sidebar={
        data.length > 0 ? (
          <>
            <SItem
              title="Weight"
              titleExtra={<FormatDecimal value={weightReduced} unit="Kg" />}
            >
              {!!weightMissingElements && (
                <> Is Missing weight of {weightMissingElements} Item</>
              )}
            </SItem>

            <SItem
              title="Size"
              titleExtra={<FormatDecimal value={sizeReduced} unit="L" />}
            >
              {!!sizeMissingElements && (
                <> Is Missing size of {sizeMissingElements} Item</>
              )}
            </SItem>
          </>
        ) : (
          <></>
        )
      }
    >
      <>
        {data.length > 0 ? (
          <>
            {dataTools.length > 0 && (
              <div className="large-list-items" id="tools">
                <h3>
                  Tools
                  <sup>{dataTools.length > 1 ? dataTools.length : ''}</sup>
                </h3>
                <ul className="list-group list-group-flush">
                  {dataTools.map((key: string) => (
                    <RequiredRowNew
                      {...getTool({
                        id: key,
                        store: storeData,
                        props: ['title'],
                      })}
                      key={key}
                      nonIteratable
                      nrItems={1}
                      id={key}
                    />
                  ))}
                </ul>
              </div>
            )}

            {dataConsumables.length > 0 && (
              <div className="large-list-items" id="consumables">
                <h3>
                  Consumables
                  <sup>
                    {dataConsumables.length > 1 ? dataConsumables.length : ''}
                  </sup>
                </h3>
                <ul className="list-group list-group-flush">
                  {dataConsumables.map((key: string) => (
                    <RequiredRowNew
                      {...getTool({
                        id: key,
                        store: storeData,
                        props: ['title'],
                      })}
                      key={key}
                      id={key}
                      units="BUC"
                      nrItems={storeData.logTools[key].count || 1}
                    />
                  ))}
                </ul>
              </div>
            )}

            {dataOther.length > 0 && (
              <div className="large-list-items" id="tools">
                <h3>
                  Other
                  <sup>{dataOther.length > 1 ? dataOther.length : ''}</sup>
                </h3>
                <ul className="list-group list-group-flush">
                  {dataOther.map((key: string) => (
                    <RequiredRowNew
                      {...getTool({
                        id: key,
                        store: storeData,
                        props: ['title'],
                      })}
                      key={key}
                      nonIteratable
                      nrItems={1}
                      id={key}
                    />
                  ))}
                </ul>
              </div>
            )}

            <div className="large-list-items" id="url-input-container">
              <div className="input-group mb-3 inline-input">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  onKeyPress={() => {}}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    const copyText: any = document.getElementById('urlCopy')
                    copyText.select()
                    copyText.setSelectionRange(0, 99999)
                    navigator.clipboard.writeText(copyText.value)
                  }}
                >
                  copy
                </span>
                <input
                  id="urlCopy"
                  onChange={() => {}}
                  type="text"
                  className="form-control"
                  placeholder="Url"
                  aria-label="Url"
                  aria-describedby="basic-addon1"
                  value={`http://localhost:3000/requiredItems/${buildUrl}`}
                />
              </div>
            </div>
          </>
        ) : (
          <>NO items</>
        )}
      </>
    </Container>
  )
}
