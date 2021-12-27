import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  getAllOptions,
  getTool,
  getToolsByProp,
} from '../components/toolWorker'
import { RequiredRowNew } from './RequiredToolsPage/row'
import { Container } from './Skaffolding/container'

export const QueryPage: React.FC = () => {
  const storeData: any = useSelector((state) => state)
  const value = decodeURIComponent(useParams<any>().value)
  const category = decodeURIComponent(useParams<any>().category)
  const pageList = getToolsByProp({
    store: storeData,
    propertie: category,
    evaluator: (e: any) => {
      if (_.isArray(e)) {
        return e.indexOf(value) > -1
      }
      return e === value
    },
  })
  const allOptions = getAllOptions({ store: storeData, option: category })

  return (
    <Container title={category} subTitle={value}>
      <>
        <div className="large-list-items">
          <ul className="list-group list-group-flush">
            {pageList.map((item: any) => (
              <RequiredRowNew
                {...getTool({
                  id: item.id,
                  store: storeData,
                  props: ['title'],
                })}
                key={item.id}
                id={item.id}
                nonIteratable
                nrItems={storeData.logTools[item.id]?.count || 0}
              />
            ))}
          </ul>
        </div>
        <div className="large-list-items">
          <hr />

          {allOptions.map((item: string, key: number) => {
            const url = `/${category}/${encodeURIComponent(item)}/`
            const text = `${key > 0 ? ' | ' : ''} ${item}`
            return (
              <Link className="link-unstyled" to={url}>
                {text}
              </Link>
            )
          })}
        </div>
      </>
    </Container>
  )
}
