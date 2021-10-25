import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { flatTolls } from '../components/toolWorker'

interface SuperProps {
  data?: any
}

export const LandingTool: React.FC<SuperProps> = (props) => {
  const { data } = props

  const toolsList = flatTolls(data)
  // generate title function
  console.log(data)

  return (
    <Fragment>
      <h1>Tool Warehouse</h1>
      {toolsList.map((key) => (
        <Link key={key} to={key}>
          <h2>{key} | {data[key.split("-")[0]][key.split("-")[1]]?.title}</h2>
        </Link>
      ))}
    </Fragment>
  )
}
