import React from 'react'
import { Container } from '../Skaffolding/container'
import MultilineChart from './MultilineChart'
import schc from './SCHC.json'
import vcit from './VCIT.json'
import portfolio from './portfolio.json'
import './graph.scss'

const portfolioData = {
  name: 'Portfolio',
  color: '#ffffff',
  items: portfolio.map((d) => ({ ...d, date: new Date(d.date) })),
}
const schcData = {
  name: 'SCHC',
  color: '#d53e4f',
  items: schc.map((d) => ({ ...d, date: new Date(d.date) })),
}
const vcitData = {
  name: 'VCIT',
  color: '#5e4fa2',
  items: vcit.map((d) => ({ ...d, date: new Date(d.date) })),
}

const dimensions = {
  width: 1000,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60,
  },
}

export const GraphPageX: React.FC = () => {
  return (
    <Container title="Graph">
      <div id="superblack">
        <MultilineChart
          // @ts-ignore
          data={[portfolioData, schcData, vcitData]}
          dimensions={dimensions}
        />
      </div>
    </Container>
  )
}
