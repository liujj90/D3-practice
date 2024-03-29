const w = 960
const h  = 500

//svg
const svg = d3.select('svg')
.attr("width", w)
.attr("height", h);

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection)

svg.append('path')
  .attr('d', pathGenerator({type: 'Sphere'}))
  .attr('class','sphere')




d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(data => {
    const countries = topojson.feature(data, data.objects.countries);
    console.log(data);

    const paths = svg.selectAll('path')
      .data(countries.features)
      .enter().append('path')
      .attr('d', pathGenerator)
      .attr('class', 'country')
  })
