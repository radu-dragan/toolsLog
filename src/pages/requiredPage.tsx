import React from 'react'
import { useSelector } from 'react-redux'
import {
  getToolsPropsValue,
  getTool,
  convertToLiter,
} from '../components/toolWorker'
import { RequiredRow } from './RequiredToolsPage/row'
import { Container } from './Skaffolding/container'
import { SItem } from './Skaffolding/sidebarItem'

interface SuperProps {
  data?: any
}

const FormatDecimal: React.FC<{ value: number; unit: string }> = ({
  value,
  unit,
}) => {
  const big = Math.floor(value)
  const small = Math.floor((value - big) * 100)

  return (
    <>
      {big}
      <sup>{small}</sup> {unit}
    </>
  )
}

export const requiredTool: React.FC<SuperProps> = () => {
  const storeData = useSelector((state) => state) as any
  const data = Object.keys(storeData.logTools)
  const dataTools = data.filter((e) => e.startsWith('A'))
  const dataConsumables = data.filter((e) => e.startsWith('C'))

  // bombine super props with the item in redux
  // use the decode

  const weight = getToolsPropsValue({
    id: Object.keys(storeData.logTools),
    store: storeData,
    props: 'weight',
  })
  const weightMissingElements = data.length - weight.length
  const weightReduced = weight.reduce((p: any, c: any) => p + +c, 0) / 1000

  const size = getToolsPropsValue({
    id: Object.keys(storeData.logTools),
    store: storeData,
    props: 'size',
  })
  const sizeMissingElements = data.length - size.length
  const sizeReduced = size.reduce((p: any, c: any) => p + convertToLiter(c), 0)

  return (
    <Container
      title="Required Items"
      // subTitle={`${data.length} Items`}
      sidebar={
        <>
          <SItem
            title="Weight"
            titleExtra={<FormatDecimal value={weightReduced} unit="Kg" />}
          >
            {!!weightMissingElements && (
              <> Is Missing weight of {weightMissingElements} Item</>
            )}
          </SItem>

          <SItem
            title="Size"
            titleExtra={<FormatDecimal value={sizeReduced} unit="L" />}
          >
            {!!sizeMissingElements && (
              <> Is Missing size of {sizeMissingElements} Item</>
            )}
          </SItem>
        </>
      }
    >
      {dataTools.length > 0 && (
        <div className="large-list-items" id="tools">
          <h3>
            Tools <sup>{dataTools.length > 1 ? dataTools.length : ''}</sup>
          </h3>
          <ul className="list-group list-group-flush">
            {dataTools.map((key: string) => (
              <RequiredRow
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
        </div>
      )}

      {dataConsumables.length > 0 && (
        <div className="large-list-items" id="consumables">
          <h3>
            Consumables{' '}
            <sup>
              {dataConsumables.length > 1 ? dataConsumables.length : ''}
            </sup>
          </h3>
          <ul className="list-group list-group-flush">
            {dataConsumables.map((key: string) => (
              <RequiredRow
                {...getTool({
                  id: key,
                  store: storeData,
                  props: ['title'],
                })}
                key={key}
                id={key}
                units={1}
              />
            ))}
          </ul>
        </div>
      )}
    </Container>
  )
}
