import {dropdownMenu} from './dropdown_menu.js'

dropdownMenu(
  d3.select('.menu'), {
    options: ['a', 'b', 'c']
  }
);


const w = 960
const h = 500

const svg = d3.select('svg')
  .attr('width', w)
  .attr('height', h);

const render = data => {
  const title = 'Scatterplot of horsepower vs mpg'
  const xAxisLabel = 'mpg'
  const xVal = d => d.mpg ;// define vars
  const yAxisLabel = 'horsepower'
  const yVal = d => d.horsepower;
  // margins
  const margin = {top : 50, right: 50 , bottom: 70, left : 200};

  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;

  const xScale = d3.scaleLinear() // scale point rather than band
    .domain(d3.extent(data,xVal))
    .range([0, innerWidth])

  const yScale = d3.scaleLinear() // scale point rather than band
    .domain(d3.extent(data,yVal))
    .range([0, innerHeight])
  //console.log(yScale.domain())
  //console.log(yScale.range())

  const xAxisTickFormat = number =>
    d3.format('.3s')(number)
      .replace('G', "B");

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight)

  const g= svg.append('g')
    .attr('transform',  `translate(${margin.left}, ${margin.top})`);

  const yaxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)

  const yAxisG = g.append('g').call(yaxis)

  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y',-90)
      .attr('x', -innerHeight/2)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);

  yAxisG.selectAll('.domain')
        .remove();

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`)

  xAxisG.select('.domain')
      .remove();

  xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y',50)
      .attr('x', innerWidth/2)
      .attr('fill','black')
      .text(xAxisLabel);

  g.selectAll('circle').data(data)
    .enter().append('circle')
    .attr('cy', d => yScale(yVal(d)) ) // pass d back into yVal
    .attr('cx', d => xScale(xVal(d)))
    .attr('r',  6)
    .attr('fill', 'red')

  g.selectAll('text')
    .attr('font-size', '2em')
  g.append('text').text(title)
    .attr('class', 'title');
}


d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
  .then(data => {
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;
    });
    render(data);
})
