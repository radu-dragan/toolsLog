// @ts-nocheck

import React from 'react'
import * as d3 from 'd3'

const MultilineChart = ({
  data = [],
  dimensions = {
    width: 1000,
    height: 300,
    margin: {
      top: 30,
      right: 30,
      bottom: 10,
      left: 60,
    },
  },
}) => {
  const svgRef = React.useRef(null)
  const { width, height, margin }: any = dimensions
  const svgWidth = width + margin.left + margin.right
  const svgHeight = height + margin.top + margin.bottom

  // const valueOffset = 1

  const superMin = (value, key) => {
    const tempArray = []
    for (let i = 0; i < value.length; i += 1) {
      tempArray.push(d3.min(data[i].items, (d) => d[key]))
    }
    return Math.min(...tempArray) * 2
  }

  const superMax = (value, key) => {
    const tempArray = []
    for (let i = 0; i < value.length; i += 1) {
      tempArray.push(d3.max(data[i].items, (d) => d[key]))
    }
    return Math.max(...tempArray) * 2
  }

  React.useEffect(() => {
    const minX = superMin(data, 'x')
    const maxX = superMax(data, 'x')
    const xScale = d3.scaleLinear().domain([minX, maxX]).range([0, width])

    const minY = superMin(data, 'y')
    const maxY = superMax(data, 'y')
    // const totalP = (Math.abs(minY) + Math.abs(maxY)) * 0.3
    // console.log(totalP)
    const yScale = d3.scaleLinear().domain([minY, maxY]).range([height, 0])

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current)
    svgEl.selectAll('*').remove() // Clear svg content before adding new elements
    const svg = svgEl
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    // Add X grid lines with labels
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSize(-height + margin.bottom)
    const xAxisGroup = svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
    xAxisGroup.select('.domain').remove()
    xAxisGroup.selectAll('line').attr('class', 'background-grid')
    xAxisGroup.selectAll('text').attr('class', 'text legend-x')
    // Add Y grid lines with labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-width)
      .tickFormat((val) => `${val}`)
    const yAxisGroup = svg.append('g').call(yAxis)
    yAxisGroup.select('.domain').remove()
    yAxisGroup.selectAll('line').attr('class', 'background-grid')
    yAxisGroup.selectAll('text').attr('class', 'text legend-x')
    // Draw the lines
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.value))

    svg
      .selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'custom-path')
      .attr('stroke', (d) => d.color)
      .attr('d', (d) => line(d.items))
  }, [data])

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      className="custom-chart"
    />
  )
}

export default MultilineChart
