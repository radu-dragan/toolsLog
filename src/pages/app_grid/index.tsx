import React, { useState } from 'react'
import { Container } from '../Skaffolding/container'
import { constructGrid } from './helpers'
import { Row } from './row'
import './style.scss'

export const AppGrid: React.FC = () => {
  const gridWidth = 100
  const gridHeight = 50
  const getDepth = 20
  const [rGrid, setRGRid] = useState([[{}, {}], [{}]])
  const grid = constructGrid({
    structure: rGrid,
    gridWidth,
    gridHeight,
    getDepth,
  })
  const gridOffset = 2

  const addRow = () => {
    console.log('row')
    setRGRid([...rGrid, [{}]])
  }

  const addCol = () => {
    console.log('col')
  }

  return (
    <Container title="container">
      <svg
        id="grid-constructor"
        viewBox={`-${gridOffset / 2} -${gridOffset / 2} ${
          gridWidth + gridOffset
        } ${gridHeight + gridOffset}`}
      >
        {grid.map((rowItems: any) => (
          <Row data={rowItems} addRow={addRow} addCol={addCol} />
        ))}
      </svg>
    </Container>
  )
}
