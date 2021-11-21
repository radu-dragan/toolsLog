import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { nothing } from '../components/devHelper'
import { getToolsByProp } from '../components/toolWorker'
import { Container } from './Skaffolding/container'
// import { filterSubtools } from '../components/toolWorker'

interface SuperProps {
  data?: any
}

interface ToolPath {
  toolId: string
}

export const SubTool: React.FC<SuperProps> = () => {
  const storeData = useSelector((state) => state)
  const subTool = decodeURIComponent(useParams<ToolPath>().toolId)
  const subToolList = getToolsByProp({
    store: storeData,
    propertie: 'subTools',
    evaluator: (e: any) => {
      return e && e.indexOf(subTool) > -1
    },
  })
  // const subToolList = filterSubtools({ subTool: toolId, allTools: storeData })

  nothing(subTool)
  nothing(storeData)

  return (
    <Container title="SubTools">
      <ul className="list-group list-group-flush">
        {subToolList.map((item: any) => (
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
