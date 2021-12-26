import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTool, getToolsByProp } from '../components/toolWorker'
import { RequiredRowNew } from './RequiredToolsPage/row'
import { Container } from './Skaffolding/container'

export interface ToolPath {
  toolId: string
}

export const StorePage: React.FC = () => {
  const storeData: any = useSelector((state) => state)
  const toolId = decodeURIComponent(useParams<ToolPath>().toolId)
  const pageList = getToolsByProp({
    store: storeData,
    propertie: 'storage',
    evaluator: (e: any) => {
      return e === toolId
    },
  })

  return (
    <Container title="Storage" subTitle={toolId}>
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
    </Container>
  )
}
