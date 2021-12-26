import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { nothing } from '../components/devHelper'
import { getTool, getToolsByProp } from '../components/toolWorker'
import { RequiredRowNew } from './RequiredToolsPage/row'
import { Container } from './Skaffolding/container'
// import { filterSubtools } from '../components/toolWorker'

interface SuperProps {
  data?: any
}

interface ToolPath {
  toolId: string
}

export const SubTool: React.FC<SuperProps> = () => {
  const storeData: any = useSelector((state) => state)
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
          <RequiredRowNew
            {...getTool({
              id: item.id,
              store: storeData,
              props: ['title'],
            })}
            key={item.id}
            id={item.id}
            nonIteratable
            // units="BUC"
            nrItems={storeData.logTools[item.id]?.count || 0}
          />
        ))}
      </ul>
    </Container>
  )
}
