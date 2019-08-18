const w = 960
const h = 500

const svg = d3.select('svg')
  .attr('width', w)
  .attr('height', h);

const render = data => {
  const title = 'World population over time'
  const xAxisLabel = 'year'
  const xVal = d => d.year ;// define vars
  const yAxisLabel = 'population'
  const yVal = d => d.population;
  // margins
  const margin = {top : 50, right: 50 , bottom: 70, left : 200};

  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;

  const xScale = d3.scaleTime() // scale point rather than band
    .domain(d3.extent(data,xVal))
    .range([0, innerWidth])

  const yScale = d3.scaleLinear() // scale point rather than band
    .domain([0, d3.max(data,yVal)])
    .range([innerHeight, 0]) /// flip y axis
   //console.log(yScale.domain())
  //console.log(yScale.range())

  const yAxisTickFormat = number =>
    d3.format('.1s')(number)
      .replace('G', "B");

  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .ticks(7)
    .tickPadding(15)

  const g= svg.append('g')
    .attr('transform',  `translate(${margin.left}, ${margin.top})`);

  const yaxis = d3.axisLeft(yScale)
    .tickFormat(yAxisTickFormat)
    .tickSize(-innerWidth)
    .tickPadding(5)

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

  const areaGenerator= d3.area() // area
    .y1(d => yScale(yVal(d)) )
    .y0(innerHeight)
    .x(d => xScale(xVal(d)))
    .curve(d3.curveBasis); // smooth


  g.append('path')
    .attr('class', 'line-path')
    .attr('d', areaGenerator(data))

  // g.selectAll('circle').data(data)
  //   .enter().append('circle')
  //   .attr('cy', d => yScale(yVal(d)) ) // pass d back into yVal
  //   .attr('cx', d => xScale(xVal(d)))
  //   .attr('r',  6)
  //   .attr('fill', 'red')

  g.selectAll('text')
    .attr('font-size', '2em')
  g.append('text').text(title)
    .attr('class', 'title');
}


d3.csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv')
  .then(data => {
  	data.forEach(d => {
      console.log(data);
			d.population = +d.population;
      d.year = new Date(d.year);
  });

	render(data)
});
