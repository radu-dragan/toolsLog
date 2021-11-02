import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  flatSubTools,
  flatTolls,
  fullPrice,
  selectToolTitle,
  storedgeTools,
} from '../components/toolWorker'
import { DT } from './_scafolding'
// import { selectToolData } from '../store/selector'

interface SuperProps {
  data?: any
}

export const LandingTool: React.FC<SuperProps> = () => {
  const storeData = useSelector((state) => state)
  const tools = flatTolls(storeData)
  const subTools = flatSubTools(storeData)
  const storadge = storedgeTools(storeData)
  // const { data } = props

  useEffect(() => {
    document.title = 'Tool WareHouse'
  }, [])

  return (
    <div className="row">
      <h1>Tool Warehouse</h1>
      <ul className="list-group list-group-flush col-8">
        {tools.map((key) => (
          <li key={key} className="list-group-item">
            <Link to={key} className="link-unstyled">
              {[key, selectToolTitle(key, storeData)]
                .filter((x) => x)
                .join(' | ')}
            </Link>
          </li>
        ))}
      </ul>
      <div className="col-4">
        <div>
          <b>Sub Tools</b>
          <hr />
          {subTools.map((key) => (
            <Link
              to={`/subTool/${encodeURIComponent(key)}`}
              className="link-unstyled"
              key={key}
            >
              {key}&nbsp;&nbsp;&nbsp;
            </Link>
          ))}
        </div>
        <div className="mt-5">
          <b>Storage</b>
          <hr />
          {storadge.map((key) => (
            <Link
              to={`/subTool/${encodeURIComponent(key)}`}
              className="link-unstyled"
              key={key}
            >
              {key}&nbsp;&nbsp;&nbsp;
            </Link>
          ))}
        </div>
        <div className="mt-5">
          <hr />
          <dl className="row">
            <DT title="Tools" value={tools.length.toString()} />
            <DT title="Total Value" value={fullPrice(storeData)} />
          </dl>
          <hr />
        </div>
      </div>
    </div>
  )
}
