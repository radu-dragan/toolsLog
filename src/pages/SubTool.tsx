import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { nothing } from '../components/devHelper'
// import { filterSubtools } from '../components/toolWorker'

interface SuperProps {
  data?: any
}

interface ToolPath {
  toolId: string
}

export const SubTool: React.FC<SuperProps> = () => {
  const storeData = useSelector((state) => state)
  const toolId = decodeURIComponent(useParams<ToolPath>().toolId)
  // const subToolList = filterSubtools({ subTool: toolId, allTools: storeData })

  nothing(storeData)
  // nothing(subToolList)
  return (
    <Fragment>
      <h1>SubTools</h1>
      <h2>{toolId}</h2>
      <div className="row">
        <hr />

        <div className="col-4">
          {/* {subToolList.map((key: string) => (
            <Link
              to={`../${encodeURIComponent(key)}`}
              className="link-unstyled"
              key={key}
            >
              {key}&nbsp;
            </Link>
          ))} */}
        </div>
      </div>
    </Fragment>
  )
}
