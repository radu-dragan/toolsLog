import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getToolsByProp } from '../components/toolWorker'
import { Container } from './Skaffolding/container'

export interface ToolPath {
  toolId: string
}

export const StorePage: React.FC = () => {
  const storeData = useSelector((state) => state)
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
          <li key={item.id} className="list-group-item">
            <Link to={`../${item.id}`} className="link-unstyled">
              {item.id}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}
