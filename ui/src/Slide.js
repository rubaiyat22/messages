import React from 'react'
import * as d3 from 'd3'

import data from './data.json'
import './chart.css'

let parseTime = d3.timeParse('%Y-%m-%d');
    data.forEach(item => {
      item.date = parseTime(item.date)
})

const pixelGap = 10

export default class Slide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hovered: false}
    this.animateLine = true
  }

  render() {
    return <div ref="slide"
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}>
           </div>
  }

  mouseEnter = () => {
    this.setState({hovered: true})
  }

  mouseLeave = () => {
    this.setState({hovered: false})
  }

  componentDidMount() {
    this.containerSvg = d3.select(this.refs.slide)
                          .append('svg')
                          .attr('id', 'countsByDay')
    this.drawChart()
  }

  componentDidUpdate() {
    this.drawChart()
  }

  drawChart = () => {
    let width = window.innerWidth, height = 500
    if (this.state.hovered) {
        width = data.length * pixelGap
    }

    this.containerSvg.attr('width', width)
                     .attr('height', height + 50)

    this.containerSvg.selectAll('g').remove()
    this.picture = this.containerSvg.append('g').attr('id', 'picture')

    //this.containerSvg.transition()
                     //.duration(500)
                     //.attr('width', width)
    //this.picture.transition()
                //.duration(500)
                //.attr('width', width)

    let xProportion = d3.scaleTime()
      .domain(d3.extent(data, item => { return item.date }))
      .rangeRound([0, width])
    let yProportion = d3.scaleLinear()
      .domain(d3.extent(data, item => { return item.count }))
      .rangeRound([height, 0])

    this.picture.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(xProportion))
    this.picture.append('g').call(d3.axisLeft(yProportion))

    let line = d3.line()
        .x(function(item) { return xProportion(item.date)})
        .y(function(item) { return yProportion(item.count)})

    this.picture.append('path')
           .datum(data)
           .attr('class', 'line')
           .attr('d', line)

    this.picture.selectAll('.dot')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', function(item) { return xProportion(item.date) })
            .attr('cy', function(item) { return yProportion(item.count) })
            .attr('r', 3)

    if (this.animateLine) {
      let totalLength = d3.select('.line').node().getTotalLength()
      this.animateLine = false
      this.picture.select('.line')// Set the line pattern to be a long line followed by an equally long gap
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        // Set the intial starting position so that only the gap is shown by offesetting by the total length of the line
        .attr('stroke-dashoffset', totalLength)
        // Then the following lines transition the line so that the gap is hidden...
        .transition()
        .duration(2000)
        .ease(d3.easeExp) //Try linear, quad, bounce... see other examples here - http://bl.ocks.org/hunzy/9929724
        .attr('stroke-dashoffset', 0)
    }
  }
}
