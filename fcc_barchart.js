const w = 960
const h = 500

const svg = d3.select('svg')
  .attr('width', w)
  .attr('height', h);

const render = data => {
  const xVal = d => d.population // define vars
  const yVal = d => d.country

  // margins
  const margin = {top : 50, right: 50 , bottom: 70, left : 200};

  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xVal)])
    .range([0, innerWidth]);


  const yScale = d3.scaleBand()
    .domain(data.map(yVal))
    .range([0, innerHeight])
    .padding(0.1);
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

  g.append('g').call(d3.axisLeft(yScale))
    .selectAll('.domain, .tick line')
      .remove();

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`)

  xAxisG.select('.domain')
      .remove();

  xAxisG.append('text')
      .attr('y',50)
      .attr('x', innerWidth/2)
      .attr('fill','black')
      .text('Population');

  g.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('y', d => yScale(yVal(d))) // pass d back into yVal
    .attr('width', d => xScale(xVal(d)))
    .attr('height', yScale.bandwidth())
    .attr('fill', 'steelblue')

  g.selectAll('text')
    .attr('font-size', '2em')
  g.append('text').text('top ten most populous countries')
}


d3.csv('population.csv').then(data => { //
  data.forEach(d => { // turn into integers
    d.population = +d.population;
  });
  render(data);
})
