import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  flatSubTools,
  fullPrice,
  getTool,
  storedgeTools,
} from '../components/toolWorker'
import { LandingRow } from './LandingTool/row'
import { Container } from './Skaffolding/container'
import { SItem } from './Skaffolding/sidebarItem'
import { DT } from './_scafolding'

export const LandingTool: React.FC = () => {
  const storeData = useSelector((state) => state)
  const { allTools } = useSelector((state) => state) as any
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

          <SItem title="Storage">
            <dl className="row">
              <DT title="Tools" value={allTools.length.toString()} />
              <DT title="Total Value" value={fullPrice(storeData)} />
            </dl>
          </SItem>
        </>
      }
    >
      <ul className="list-group list-group-flush">
        {allTools.map((key: string) => (
          <LandingRow
            {...getTool({
              id: key,
              store: storeData,
              props: ['title'],
            })}
            key={key}
            id={key}
          />
        ))}
      </ul>
    </Container>
  )
}
