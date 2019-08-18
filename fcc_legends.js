const w = 960
const h = 800

const svg = d3.select('svg')
 .attr("height", h)
 .attr("width", w)


const colorScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon', 'limes','oranges'])
  .range(['#c11d1d', '#eae600', 'green', 'orange']);

const sizeScale = d3.scaleSqrt()
  .domain([0,10])
  .range([0,50]);


const colourLegend = (selection, props) => {
  const { colorScale, circleRadius, spacing, textOffset } = props;

  const groups = selection.selectAll('g')
    .data(colorScale.domain());

  const groupsEnter = groups.enter().append('g');
  groupsEnter
    .merge(groups)
    .attr('transform', (d, i) =>
    `translate(0,  ${i * spacing})`
  );

  groups.exit().remove();

  groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('r', circleRadius)
      .attr('fill', colorScale);

  groupsEnter.append('text')
    .merge(groups.select('text'))
      .text(d => d)
      .attr('dy', '0.32em')
      .attr('x', textOffset);
}

const sizeLegend = (selection, props) => {
  const { sizeScale, spacing, textOffset, numTicks } = props;

  //get items
  const ticks = sizeScale.ticks(numTicks).filter(d => d!=0)
    .reverse(); //reverse array to big to small

  const groups = selection.selectAll('g')
    .data(ticks);

  const groupsEnter = groups.enter().append('g');
  groupsEnter
    .merge(groups)
    .attr('transform', (d, i) =>
    `translate(0,  ${i * spacing})`
  );

  groups.exit().remove();

  groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('r', sizeScale)
      .attr('fill', 'rgba(0,0,0,0.5)');

  groupsEnter.append('text')
    .merge(groups.select('text'))
      .text(d => d)
      .attr('dy', '0.32em')
      .attr('x', textOffset);
}


const height = +svg.attr('height')

svg.append('g')
  .attr('transform', `translate(100,${height/2})`)
  .call(colourLegend, {
  colorScale,
  circleRadius: 30,
  spacing: 80,
  textOffset : 100
})

svg.append('g')
  .attr('transform', `translate(600,${height/2})`)
  .call(sizeLegend, {
  sizeScale,
  spacing: 80,
  textOffset : 50,
  numTicks: 5
})
