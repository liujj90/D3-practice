import {colourLegend} from './fcc_choropleth_scale_click.js'

const w = document.body.clientWidth;
const h  = document.body.clientHeight;

//svg
const svg = d3.select('svg')
.attr("width", w)
.attr("height", h);

const a = svg.append('g')
const g = svg.append('g').merge(a)

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection)



  const colorLegendG = svg.append('g')
    .attr('transform', `translate(100,${h/2})`);


svg.call(d3.zoom().on('zoom', ()=> {
  a.attr('transform', d3.event.transform)
  g.attr('transform', d3.event.transform)
}))

const colorScale = d3.scaleOrdinal();
const colorValue = d=> d.properties.economy;
let features;
// define a render
const render = () => {


  // determine colourscale
  colorScale.domain(features.map(colorValue))
      .domain(colorScale.domain().sort().reverse())
      .range(d3.schemeSpectral[colorScale.domain().length]);


  // colour legend
  colorLegendG.call(colourLegend, {
    colorScale,
    circleRadius: 10,
    spacing: 30,
    textOffset : 100,
    backgroundRectWidth: 500,
    onclick: onclick,
    selectedColorValue
})
console.log(selectedColorValue)

// render globe
a.append('path')
  .attr('d', pathGenerator({type: 'Sphere'}))
  .attr('class','sphere')
  .attr('opacity', selectedColorValue ? 0.2 : 0.6)



// render path
const pathRender = g.selectAll('path')
   .data(features)
const countryPathsEnter = pathRender
   .enter().append('path')
   .attr('class', 'country')
pathRender // general update pattern !!
  .merge(countryPathsEnter)
   .attr('d', pathGenerator)
   .attr('fill', d => colorScale(colorValue(d)))
   .attr('opacity', d =>
      (!selectedColorValue || selectedColorValue === colorValue(d))
        ? 1
        : 0.2)
        // insert class based on slection , add thicker border in css
    .classed('highlighted', d => selectedColorValue && selectedColorValue === colorValue(d))
countryPathsEnter
      .append('title')//add text
          .text(d => d.properties.name + ': ' + colorValue(d))
};

//method for click interatcion
let selectedColorValue;

const onclick = d =>{
  selectedColorValue = d;
  render();
}

// load and process data
Promise.all([
  d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
  d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
]).then(([tsvData, topoJSONdata]) => {

  const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);

// use.d.name for title, d.iso_n3 for id
  const rowById = {};
  tsvData.forEach(d => {
    rowById[d.iso_n3] = d;
  })

// get by id
  countries.features.forEach(d => {
    Object.assign(d.properties, rowById[d.id])
  });
  features = countries.features
  render(features);
})
