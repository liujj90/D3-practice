const w = 960
const h  = 500
const eyespacing = 100
const eyeYoffset = -70
const eyeradius = 30

const eyebrowoffset = -70
const eyebrowWidth = 50;
const eyebrowHieght = 20;
//svg
const svg = d3.select('svg')
.attr("width", w)
.attr("height", h);


//create group
const g = svg.append('g')
  .attr('transform', `translate(${w/2}, ${h/2})`)

//face
const circle = g.append('circle')


circle.attr('r', 200)
  .attr("fill", "yellow")
  .attr("stroke", "black");
//eyes

const eyesG = g.append('g')
  .attr('transform', `translate(0, ${eyeYoffset})`)

const leftEye = eyesG.append('circle')
  .attr('r', eyeradius)
  .attr('cx', - eyespacing);

const rightEye = eyesG.append('circle')
    .attr('r', eyeradius)
    .attr('cx',  eyespacing);

const eyebrowG = eyesG.append('g')
  .attr('transform', `translate(0, ${eyebrowoffset})`);

eyebrowG.transition()
      .duration(2000)
      .attr('transform', `translate(0, ${eyebrowoffset - 30})`)
  .transition()
      .duration(2000)
      .attr('transform', `translate(0, ${eyebrowoffset})`)

const lefteyebrow = eyebrowG.append('rect')
  .attr('x', -eyespacing - eyebrowWidth /2)
  .attr("width", eyebrowWidth)
  .attr("height", eyebrowHieght)


  const righteyebrow = eyebrowG.append('rect')
    .attr('x', eyespacing - eyebrowWidth /2)
    .attr("width", eyebrowWidth)
    .attr("height", eyebrowHieght)

// mouth
const mouth = g.append('path')
      .attr('d', d3.arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI/2,
        endAngle: Math.PI *3/2
      }))
