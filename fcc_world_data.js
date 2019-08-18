const w = document.body.clientWidth;
const h  = document.body.clientHeight;

const margin = {top:0, left:75, right:70, bottom:0}
const innerHeight = h-margin.top - margin.bottom
const innerWidth = w - margin.left - margin.right

// to construct tree
const treeLayout = d3.tree()
  .size([innerHeight, innerWidth])

const svg = d3.select('svg');
const zoomG = svg
.attr("width", w)
.attr("height", h);

const g = zoomG.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.call(d3.zoom().on('zoom', ()=> {
  zoomG.attr('transform', d3.event.transform);
}));

const data = d3.json('world_data.json')
  .then(data => {
    const root = d3.hierarchy(data);
    const links = treeLayout(root).links();
    const linkPathgenerator = d3.linkHorizontal()
          .x(d =>d.y)
          .y(d => d.x)
    g.selectAll('path').data(links)
      .enter().append('path')
        .attr('d', linkPathgenerator);

    g.selectAll('text').data(root.descendants())
      .enter().append('text')
        .attr('x', d=> d.y)
        .attr('y', d=> d.x)
        .attr('dy', '0.32em')
        .attr('text-anchor', d => d.children ? 'middle' : 'start')// if there are children, start from middle else start
        .attr('font-size', d=> 3.25-d.depth + 'em')
        .text(d => d.data.data.id)


  })
