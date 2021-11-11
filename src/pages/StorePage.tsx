import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectByProp } from '../components/toolWorker'

interface ToolPath {
  toolId: string
}

export const StorePage: React.FC = () => {
  const storeData = useSelector((state) => state)
  const toolId = decodeURIComponent(useParams<ToolPath>().toolId)
  const pageList = selectByProp({
    store: storeData,
    propertie: 'storage',
    evaluator: (e: any) => {
      return e === toolId
    },
  })
  console.log(pageList)

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Storage</h1>
          <h2>{toolId}</h2>
        </div>
      </div>
      <div className="row">
        <hr />
        <div className="col-12">
          <ul className="list-group list-group-flush col-8">
            {pageList.map((item: any) => (
              <li key={item.id} className="list-group-item">
                <Link to={`../${item.id}`} className="link-unstyled">
                  {item.id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
