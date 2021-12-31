import React from 'react'
import { Container } from '../Skaffolding/container'
import MultilineChart from './MultilineChart'
import portfolio from './testData.json'
import './graph.scss'
import { gColor } from './graph_colors'

const data: any = []

data.push({
  name: 'Portfolio',
  color: gColor.lines[0],
  items: portfolio.map((d) => ({ ...d, x: d.marketvalue, y: d.value })),
})

export const GraphPage: React.FC = () => {
  return (
    <Container title="Graph">
      <MultilineChart
        // @ts-ignore
        data={data}
      />
    </Container>
  )
}
