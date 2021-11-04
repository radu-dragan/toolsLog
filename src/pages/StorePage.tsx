import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

interface ToolPath {
  toolId: string
}

export const StorePage: React.FC = () => {
  const toolId = decodeURIComponent(useParams<ToolPath>().toolId)

  return (
    <Fragment>
      <h1>SubTools</h1>
      <h2>{toolId}</h2>
      <div className="row">
        <hr />

        <div className="col-4">X</div>
      </div>
    </Fragment>
  )
}
