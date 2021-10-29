import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { flatTolls, selectToolTitle } from '../components/toolWorker'
// import { selectToolData } from '../store/selector'

interface SuperProps {
  data?: any
}

export const LandingTool: React.FC<SuperProps> = () => {
  const storeData = useSelector((state) => state)
  const toolTest = flatTolls(storeData)
  // const { data } = props

  useEffect(() => {
    document.title = 'Tool WareHouse'
  }, [])

  return (
    <Fragment>
      <h1>Tool Warehouse</h1>
      <ul className="list-group list-group-flush">
        {toolTest.map((key) => (
          <li className="list-group-item">
            <Link key={key} to={key} className="link-unstyled">
              {[key, selectToolTitle(key, storeData)]
                .filter((x) => x)
                .join(' | ')}
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}
