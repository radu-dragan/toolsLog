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
      subTitle={`${data.length} Items`}
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
      <ul className="list-group list-group-flush">
        {data.map((key: string) => (
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
    </Container>
  )
}
