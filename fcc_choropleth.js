import {colourLegend} from './fcc_choropleth_scale.js'

const w = document.body.clientWidth;
const h  = document.body.clientHeight;

//svg
const svg = d3.select('svg')
.attr("width", w)
.attr("height", h);

const g = svg.append('g')

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection)

g.append('path')
  .attr('d', pathGenerator({type: 'Sphere'}))
  .attr('class','sphere')

  const colorLegendG = svg.append('g')
    .attr('transform', `translate(100,${h/2})`);


svg.call(d3.zoom().on('zoom', ()=> {
  g.attr('transform', d3.event.transform)
}))

const colorScale = d3.scaleOrdinal();
const colorValue = d=> d.properties.economy;

// load and process data
Promise.all([
  d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
  d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
]).then(([tsvData, topoJSONdata])=> {

  const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
// use.d.name for title, d.iso_n3 for id
  const rowById = {};
  tsvData.forEach(d => {
    rowById[d.iso_n3] = d;
  })
// get by id
  countries.features.forEach(d => {
    Object.assign(d.properties, rowById[d.id])
  })
// determine colourscale
  colorScale.domain(countries.features.map(colorValue))
    .domain(colorScale.domain().sort().reverse())
    .range(d3.schemeSpectral[colorScale.domain().length]);
// colour legend
colorLegendG.call(colourLegend, {
  colorScale,
  circleRadius: 10,
  spacing: 30,
  textOffset : 100,
  backgroundRectWidth: 500
})

// render
  const paths = g.selectAll('path')
    .data(countries.features)
    .enter().append('path')
    .attr('d', pathGenerator)
    .attr('class', 'country')
    .attr('fill', d => colorScale(colorValue(d)))
  .append('title')//add text
    .text(d => d.properties.name + ': ' + colorValue(d))
})
