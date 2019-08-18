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




svg.call(d3.zoom().on('zoom', ()=> {
  g.attr('transform', d3.event.transform)
}) )


Promise.all([
  d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
  d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
]).then(([tsvData, topoJSONdata])=> {
  const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
  console.log(topoJSONdata);
// use.d.name for title, d.iso_n3 for id


  const countryName = {};
  tsvData.forEach(d => {
    countryName[d.iso_n3] = d.name;
  })

  const paths = g.selectAll('path')
    .data(countries.features)
    .enter().append('path')
    .attr('d', pathGenerator)
    .attr('class', 'country')
  .append('title')//add text
    .text(d => (countryName[d.id]))
})
