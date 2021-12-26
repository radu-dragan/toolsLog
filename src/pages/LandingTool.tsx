import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  flatSubTools,
  fullPrice,
  getTool,
  storedgeTools,
} from '../components/toolWorker'
// import { LandingRow } from './LandingTool/row'
import { RequiredRowNew } from './RequiredToolsPage/row'
import { Container } from './Skaffolding/container'
import { SItem } from './Skaffolding/sidebarItem'
import { DT } from './_scafolding'

export const LandingTool: React.FC = () => {
  const storeData: any = useSelector((state) => state)
  const { allTools, allConsumables, allBike, allStorage } = useSelector(
    (state) => state
  ) as any
  const subTools = flatSubTools(storeData)
  const storadge = storedgeTools(storeData)

  useEffect(() => {
    document.title = 'Tool WareHouse'
  }, [])

  return (
    <Container
      title="Tool Warehouse"
      back={false}
      sidebar={
        <>
          <SItem title="Sub Tools">
            <>
              {subTools.map((key) => (
                <Link
                  to={`/subTools/${encodeURIComponent(key)}`}
                  className="link-unstyled"
                  key={key}
                >
                  {key}&nbsp;&nbsp;&nbsp;
                </Link>
              ))}
            </>
          </SItem>

          <SItem title="Storage">
            <>
              {storadge.map((key) => (
                <Link
                  to={`/storage/${encodeURIComponent(key)}`}
                  className="link-unstyled"
                  key={key}
                >
                  {key}&nbsp;&nbsp;&nbsp;
                </Link>
              ))}
            </>
          </SItem>

          <SItem title="Total">
            <dl className="row">
              <dd className="col-sm-12">
                <Link className="link-unstyled" to="/table/">
                  Map
                </Link>
              </dd>
              <DT title="Tools" value={allTools.length.toString()} />
              <DT title="Total Value" value={fullPrice(storeData)} />
            </dl>
          </SItem>
        </>
      }
    >
      <div className="large-list-items" id="tools">
        <ul className="list-group list-group-flush">
          {allTools.map((key: string) => (
            <RequiredRowNew
              {...getTool({
                id: key,
                store: storeData,
                props: ['title'],
              })}
              key={key}
              id={key}
              // units="BUC"
              nrItems={storeData.logTools[key]?.count || 0}
              nonIteratable
            />
          ))}
        </ul>
      </div>

      <div className="large-list-items" id="consumables">
        <h3> Consumables </h3>
        <ul className="list-group list-group-flush">
          {allConsumables.map((key: string) => (
            <RequiredRowNew
              {...getTool({
                id: key,
                store: storeData,
                props: ['title'],
              })}
              key={key}
              id={key}
              units="BUC"
              nrItems={storeData.logTools[key]?.count || 0}
            />
          ))}
        </ul>
      </div>

      <div className="large-list-items" id="consumables">
        <h3>Bikes </h3>
        <ul className="list-group list-group-flush">
          {allBike.map((key: string) => (
            <RequiredRowNew
              {...getTool({
                id: key,
                store: storeData,
                props: ['title'],
              })}
              key={key}
              id={key}
              nrItems={storeData.logTools[key]?.count || 0}
              nonIteratable
            />
          ))}
        </ul>
      </div>

      <div className="large-list-items" id="consumables">
        <h3>Storage </h3>
        <ul className="list-group list-group-flush">
          {allStorage
            .filter((x: string) => x.startsWith('Z'))
            .map((key: string) => (
              <RequiredRowNew
                {...getTool({
                  id: key,
                  store: storeData,
                  props: ['title'],
                })}
                key={key}
                id={key}
                nrItems={storeData.logTools[key]?.count || 0}
                nonIteratable
              />
            ))}
        </ul>
      </div>
    </Container>
  )
}
