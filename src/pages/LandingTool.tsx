import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddBar } from '../components/landing_page_bar'
import {
  flatSubTools,
  // flatTolls,
  fullPrice,
  selectToolTitle,
  storedgeTools,
} from '../components/toolWorker'
import { DT } from './_scafolding'
// import { selectToolData } from '../store/selector'

export const LandingTool: React.FC = () => {
  const storeData = useSelector((state) => state)
  const { allTools } = useSelector((state) => state) as any
  const subTools = flatSubTools(storeData)
  const storadge = storedgeTools(storeData)

  useEffect(() => {
    document.title = 'Tool WareHouse'
  }, [])

  return (
    <>
    <AddBar />
      <div className="container">
        <div className="row">
          <h1>Tool Warehouse</h1>
          <ul className="list-group list-group-flush col-8">
            {allTools.map((key: string) => (
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
                  to={`/subTools/${encodeURIComponent(key)}`}
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
                  to={`/storage/${encodeURIComponent(key)}`}
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
                <DT title="Tools" value={allTools.length.toString()} />
                <DT title="Total Value" value={fullPrice(storeData)} />
              </dl>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
