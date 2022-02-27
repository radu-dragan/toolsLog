import React, { useEffect } from 'react'
// import * as d3 from 'd3'

// export function drawChart(height: any, width: any, data: any) {
//   d3.select('#chart')
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .style('border', '1px solid black')
//     .append('text')
//     .attr('fill', 'green')
//     .attr('x', 50)
//     .attr('y', 50)
//     .text('Hello D3')
// }

export const GraphPage2: React.FC = () => {
  // const [data, setData] = useState([])
  useEffect(() => {
    console.log('2')
    // drawChart(400, 600)
  }, [])

  return <div id="chart">X</div>
}

// // App.jsF

// function App() {
//   const [data, setData] = useState([])

//   useEffect(() => {
//     drawChart(400, 600)
//   }, [])

//   return (
//     <div className="App">
//       <h2>Graphs with React</h2>
//       <div id="chart"></div>
//     </div>
//   )
// }

// export default App
