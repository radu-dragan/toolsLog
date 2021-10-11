import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'

interface ToolPath {
  toolId: string
}
export const ToolID: React.FC = () => {
  const { toolId } = useParams<ToolPath>()
  console.log(toolId)

  return (
    <Fragment>
      <h1>ToolID</h1>
      <p>LandingTool {toolId}</p>
    </Fragment>
  )
}
