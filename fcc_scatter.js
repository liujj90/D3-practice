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
    .range([0, innerWidth])
    .nice();


  const yScale = d3.scalePoint() // scale point rather than band
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

  const yaxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)

  g.append('g').call(yaxis)
    .selectAll('.domain')
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

  g.selectAll('circle').data(data)
    .enter().append('circle')
    .attr('cy', d => yScale(yVal(d)) ) // pass d back into yVal
    .attr('cx', d => xScale(xVal(d)))
    .attr('r',  15)
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
