const w = 960
const h = 500

const svg = d3.select('svg')
  .attr('width', w)
  .attr('height', h);

const render = data => {
  const title = 'A week in SF'
  const xAxisLabel = 'time'
  const xVal = d => d.timestamp ;// define vars
  const yAxisLabel = 'temp'
  const yVal = d => d.temperature;
  // margins
  const margin = {top : 50, right: 50 , bottom: 70, left : 200};

  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;

  const xScale = d3.scaleTime() // scale point rather than band
    .domain(d3.extent(data,xVal))
    .range([0, innerWidth])

  const yScale = d3.scaleLinear() // scale point rather than band
    .domain(d3.extent(data,yVal))
    .range([innerHeight, 0]) /// flip y axis
   //console.log(yScale.domain())
  //console.log(yScale.range())

  const xAxisTickFormat = number =>
    d3.format('.3s')(number)
      .replace('G', "B");

  const xAxis = d3.axisBottom(xScale)
    //.tickFormat(xAxisTickFormat)
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

  const areaGenerator= d3.area() // area
    .y1(d => yScale(yVal(d)) )
    .y0(innerHeight)
    .x(d => xScale(xVal(d)))
    .curve(d3.curveBasis); // smooth


  g.append('path')
    .attr('class', 'line-path')
    .attr('d', areaGenerator(data))

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


d3.csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
  .then(data => {
    data.forEach(d => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
    });
    render(data);
  });
