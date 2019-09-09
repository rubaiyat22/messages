const pixelGap = 10

function drawChart(width, height, data, element, animateLine=false){
  let xProportion = d3.scaleTime()
    .domain(d3.extent(data, function(item) { return item.date }))
    .rangeRound([0, width])
  let yProportion = d3.scaleLinear()
    .domain(d3.extent(data, function(item) { return item.count }))
    .rangeRound([height, 0])

  element.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(xProportion))
  element.append('g').call(d3.axisLeft(yProportion))

  let line = d3.line()
      .x(function(item) { return xProportion(item.date)})
      .y(function(item) { return yProportion(item.count)})

  element.append('path')
         .datum(data)
         .attr('class', 'line')
         .attr('d', line)

  element.selectAll('.dot')
          .data(data)
          .enter().append('circle')
          .attr('class', 'dot')
          .attr('cx', function(item) { return xProportion(item.date) })
          .attr('cy', function(item) { return yProportion(item.count) })
          .attr('r', 3)

  let totalLength = d3.select('.line').node().getTotalLength()

  if (animateLine) {
  d3.select('.line')// Set the line pattern to be a long line followed by an equally long gap
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

$(document).ready(function() {
  let data = [
    {'date': '2018-04-14', 'count': 1}, {'date': '2018-04-26', 'count': 230}, {'date': '2018-04-27', 'count': 123}, {'date': '2018-04-28', 'count': 109}, {'date': '2018-04-29', 'count': 18}, {'date': '2018-05-01', 'count': 35}, {'date': '2018-05-04', 'count': 36}, {'date': '2018-05-05', 'count': 182}, {'date': '2018-05-06', 'count': 109}, {'date': '2018-05-07', 'count': 104}, {'date': '2018-05-08', 'count': 32}, {'date': '2018-05-09', 'count': 231}, {'date': '2018-05-10', 'count': 10}, {'date': '2018-05-11', 'count': 118}, {'date': '2018-05-13', 'count': 70}, {'date': '2018-05-14', 'count': 127}, {'date': '2018-05-15', 'count': 10}, {'date': '2018-05-16', 'count': 53}, {'date': '2018-05-17', 'count': 34}, {'date': '2018-05-18', 'count': 197}, {'date': '2018-05-19', 'count': 167}, {'date': '2018-05-20', 'count': 231}, {'date': '2018-05-21', 'count': 75}, {'date': '2018-05-22', 'count': 305}, {'date': '2018-05-23', 'count': 28}, {'date': '2018-05-24', 'count': 77}, {'date': '2018-05-25', 'count': 524}, {'date': '2018-05-26', 'count': 70}, {'date': '2018-05-29', 'count': 2}, {'date': '2018-06-01', 'count': 4}, {'date': '2018-06-05', 'count': 1}, {'date': '2018-06-10', 'count': 76}, {'date': '2018-06-11', 'count': 81}, {'date': '2018-06-12', 'count': 21}, {'date': '2018-06-13', 'count': 25}, {'date': '2018-06-14', 'count': 2}, {'date': '2018-06-17', 'count': 2}, {'date': '2018-06-19', 'count': 9}, {'date': '2018-06-20', 'count': 1}, {'date': '2018-06-22', 'count': 1}, {'date': '2018-06-25', 'count': 182}, {'date': '2018-06-26', 'count': 168}, {'date': '2018-06-28', 'count': 8}, {'date': '2018-06-29', 'count': 1}, {'date': '2018-06-30', 'count': 98}, {'date': '2018-07-01', 'count': 15}, {'date': '2018-07-02', 'count': 6}, {'date': '2018-07-04', 'count': 7}, {'date': '2018-07-05', 'count': 6}, {'date': '2018-07-06', 'count': 21}, {'date': '2018-07-07', 'count': 35}, {'date': '2018-07-13', 'count': 172}, {'date': '2018-07-14', 'count': 18}, {'date': '2018-07-15', 'count': 11}, {'date': '2018-07-16', 'count': 62}, {'date': '2018-07-17', 'count': 183}, {'date': '2018-07-18', 'count': 3}, {'date': '2018-07-23', 'count': 17}, {'date': '2018-07-24', 'count': 4}, {'date': '2018-07-25', 'count': 7}, {'date': '2018-07-26', 'count': 6}, {'date': '2018-07-27', 'count': 194}, {'date': '2018-07-29', 'count': 1}, {'date': '2018-08-06', 'count': 11}, {'date': '2018-08-07', 'count': 13}, {'date': '2018-08-08', 'count': 183}, {'date': '2018-08-09', 'count': 279}, {'date': '2018-08-10', 'count': 21}, {'date': '2018-08-12', 'count': 14}, {'date': '2018-08-16', 'count': 17}, {'date': '2018-08-17', 'count': 88}, {'date': '2018-08-18', 'count': 324}, {'date': '2018-08-19', 'count': 52}, {'date': '2018-08-20', 'count': 458}, {'date': '2018-08-21', 'count': 230}, {'date': '2018-08-22', 'count': 82}, {'date': '2018-08-23', 'count': 68}, {'date': '2018-08-24', 'count': 97}, {'date': '2018-08-25', 'count': 343}, {'date': '2018-08-26', 'count': 305}, {'date': '2018-08-27', 'count': 430}, {'date': '2018-08-28', 'count': 318}, {'date': '2018-08-29', 'count': 644}, {'date': '2018-08-30', 'count': 141}, {'date': '2018-08-31', 'count': 308}, {'date': '2018-09-01', 'count': 616}, {'date': '2018-09-02', 'count': 450}, {'date': '2018-09-03', 'count': 174}, {'date': '2018-09-04', 'count': 179}, {'date': '2018-09-05', 'count': 447}, {'date': '2018-09-06', 'count': 487}, {'date': '2018-09-07', 'count': 301}, {'date': '2018-09-08', 'count': 35}, {'date': '2018-09-09', 'count': 35}, {'date': '2018-09-10', 'count': 151}, {'date': '2018-09-11', 'count': 77}, {'date': '2018-09-12', 'count': 60}, {'date': '2018-09-13', 'count': 167}, {'date': '2018-09-14', 'count': 242}, {'date': '2018-09-15', 'count': 175}, {'date': '2018-09-16', 'count': 140}, {'date': '2018-09-17', 'count': 185}, {'date': '2018-09-18', 'count': 92}, {'date': '2018-09-19', 'count': 59}, {'date': '2018-09-20', 'count': 150}, {'date': '2018-09-21', 'count': 43}, {'date': '2018-09-22', 'count': 24}, {'date': '2018-09-23', 'count': 44}, {'date': '2018-09-24', 'count': 87}, {'date': '2018-09-25', 'count': 26}, {'date': '2018-09-26', 'count': 231}, {'date': '2018-09-27', 'count': 100}, {'date': '2018-09-28', 'count': 92}, {'date': '2018-09-29', 'count': 72}, {'date': '2018-09-30', 'count': 42}, {'date': '2018-10-01', 'count': 303}, {'date': '2018-10-02', 'count': 279}, {'date': '2018-10-03', 'count': 266}, {'date': '2018-10-04', 'count': 339}, {'date': '2018-10-05', 'count': 103}, {'date': '2018-10-06', 'count': 105}, {'date': '2018-10-07', 'count': 72}, {'date': '2018-10-08', 'count': 195}, {'date': '2018-10-09', 'count': 194}, {'date': '2018-10-10', 'count': 63}, {'date': '2018-10-11', 'count': 321}, {'date': '2018-10-12', 'count': 62}, {'date': '2018-10-13', 'count': 73}, {'date': '2018-10-14', 'count': 95}, {'date': '2018-10-15', 'count': 199}, {'date': '2018-10-16', 'count': 100}, {'date': '2018-10-17', 'count': 161}, {'date': '2018-10-18', 'count': 131}, {'date': '2018-10-19', 'count': 41}, {'date': '2018-10-20', 'count': 154}, {'date': '2018-10-21', 'count': 88}, {'date': '2018-10-22', 'count': 257}, {'date': '2018-10-23', 'count': 187}, {'date': '2018-10-24', 'count': 85}, {'date': '2018-10-25', 'count': 111}, {'date': '2018-10-26', 'count': 48}, {'date': '2018-10-27', 'count': 79}, {'date': '2018-10-28', 'count': 129}, {'date': '2018-10-29', 'count': 112}, {'date': '2018-10-30', 'count': 157}, {'date': '2018-10-31', 'count': 256}, {'date': '2018-11-01', 'count': 135}, {'date': '2018-11-02', 'count': 114}, {'date': '2018-11-03', 'count': 42}, {'date': '2018-11-04', 'count': 234}, {'date': '2018-11-05', 'count': 148}, {'date': '2018-11-06', 'count': 184}, {'date': '2018-11-07', 'count': 32}, {'date': '2018-11-08', 'count': 158}, {'date': '2018-11-09', 'count': 64}, {'date': '2018-11-10', 'count': 70}, {'date': '2018-11-11', 'count': 220}, {'date': '2018-11-12', 'count': 308}, {'date': '2018-11-13', 'count': 213}, {'date': '2018-11-14', 'count': 256}, {'date': '2018-11-15', 'count': 86}, {'date': '2018-11-16', 'count': 72}, {'date': '2018-11-17', 'count': 22}, {'date': '2018-11-18', 'count': 251}, {'date': '2018-11-19', 'count': 223}, {'date': '2018-11-20', 'count': 198}, {'date': '2018-11-21', 'count': 70}, {'date': '2018-11-22', 'count': 48}, {'date': '2018-11-23', 'count': 32}, {'date': '2018-11-24', 'count': 255}, {'date': '2018-11-25', 'count': 71}, {'date': '2018-11-26', 'count': 195}, {'date': '2018-11-27', 'count': 82}, {'date': '2018-11-28', 'count': 286}, {'date': '2018-11-29', 'count': 131}, {'date': '2018-11-30', 'count': 110}, {'date': '2018-12-01', 'count': 145}, {'date': '2018-12-02', 'count': 108}, {'date': '2018-12-03', 'count': 262}, {'date': '2018-12-04', 'count': 499}, {'date': '2018-12-05', 'count': 174}, {'date': '2018-12-06', 'count': 142}, {'date': '2018-12-07', 'count': 131}, {'date': '2018-12-08', 'count': 121}, {'date': '2018-12-09', 'count': 13}, {'date': '2018-12-10', 'count': 291}, {'date': '2018-12-11', 'count': 78}, {'date': '2018-12-12', 'count': 378}, {'date': '2018-12-13', 'count': 54}, {'date': '2018-12-14', 'count': 248}, {'date': '2018-12-15', 'count': 116}, {'date': '2018-12-16', 'count': 67}, {'date': '2018-12-17', 'count': 56}, {'date': '2018-12-18', 'count': 301}, {'date': '2018-12-19', 'count': 125}, {'date': '2018-12-20', 'count': 261}, {'date': '2018-12-21', 'count': 107}, {'date': '2018-12-22', 'count': 54}, {'date': '2018-12-23', 'count': 238}, {'date': '2018-12-24', 'count': 211}, {'date': '2018-12-25', 'count': 23}, {'date': '2018-12-26', 'count': 205}, {'date': '2018-12-27', 'count': 121}, {'date': '2018-12-28', 'count': 285}, {'date': '2018-12-29', 'count': 107}, {'date': '2018-12-30', 'count': 111}, {'date': '2018-12-31', 'count': 61}, {'date': '2019-01-01', 'count': 168}, {'date': '2019-01-02', 'count': 274}, {'date': '2019-01-03', 'count': 177}, {'date': '2019-01-04', 'count': 207}, {'date': '2019-01-05', 'count': 324}, {'date': '2019-01-06', 'count': 319}, {'date': '2019-01-07', 'count': 347}, {'date': '2019-01-08', 'count': 304}, {'date': '2019-01-09', 'count': 172}, {'date': '2019-01-10', 'count': 59}, {'date': '2019-01-11', 'count': 46}, {'date': '2019-01-12', 'count': 279}, {'date': '2019-01-13', 'count': 316}, {'date': '2019-01-14', 'count': 166}, {'date': '2019-01-15', 'count': 379}, {'date': '2019-01-16', 'count': 240}, {'date': '2019-01-17', 'count': 540}, {'date': '2019-01-18', 'count': 226}, {'date': '2019-01-19', 'count': 64}, {'date': '2019-01-20', 'count': 237}, {'date': '2019-01-21', 'count': 61}, {'date': '2019-01-22', 'count': 177}, {'date': '2019-01-23', 'count': 267}, {'date': '2019-01-24', 'count': 169}, {'date': '2019-01-25', 'count': 244}, {'date': '2019-01-26', 'count': 240}, {'date': '2019-01-27', 'count': 160}, {'date': '2019-01-28', 'count': 269}, {'date': '2019-01-29', 'count': 233}, {'date': '2019-01-30', 'count': 414}, {'date': '2019-01-31', 'count': 218}, {'date': '2019-02-01', 'count': 112}, {'date': '2019-02-02', 'count': 162}, {'date': '2019-02-03', 'count': 162}, {'date': '2019-02-04', 'count': 406}, {'date': '2019-02-05', 'count': 332}, {'date': '2019-02-06', 'count': 165}, {'date': '2019-02-07', 'count': 191}, {'date': '2019-02-08', 'count': 152}, {'date': '2019-02-09', 'count': 160}, {'date': '2019-02-10', 'count': 154}, {'date': '2019-02-11', 'count': 195}, {'date': '2019-02-12', 'count': 267}, {'date': '2019-02-13', 'count': 65}, {'date': '2019-02-14', 'count': 81}, {'date': '2019-02-15', 'count': 29}, {'date': '2019-02-17', 'count': 1}, {'date': '2019-02-18', 'count': 9}, {'date': '2019-02-19', 'count': 128}, {'date': '2019-02-20', 'count': 227}, {'date': '2019-02-21', 'count': 183}, {'date': '2019-02-22', 'count': 130}, {'date': '2019-02-23', 'count': 188}, {'date': '2019-02-24', 'count': 207}, {'date': '2019-02-25', 'count': 190}, {'date': '2019-02-26', 'count': 136}, {'date': '2019-02-27', 'count': 126}, {'date': '2019-02-28', 'count': 112}
  ]
  let parseTime = d3.timeParse('%Y-%m-%d');
  data.forEach(function(item) {
    item.date = parseTime(item.date)
  })

  let width = window.innerWidth, height = 500

  let containerSvg = d3.select('body')
                       .append('svg')
                       .attr('id', 'countsByDay')
                       .attr('width', width)
                       .attr('height', height + 50)
  let picture = containerSvg.append('g').attr('id', 'picture')

  drawChart(width, height, data, picture, animateLine=true)

  $('#countsByDay').hover(
    function(){
      width = data.length * pixelGap
      $('#picture').empty()
      $('#countsByDay').animate({width: width}, 500)
      $('#picture').animate({width: width}, 500)
      drawChart(width, height, data, picture)
    },
    function(){
      width = window.innerWidth
      $('#picture').empty()
      $('#countsByDay').animate({width: width}, 500)
      $('#picture').animate({width: width}, 500)
      drawChart(width, height, data, picture)
  })

})

