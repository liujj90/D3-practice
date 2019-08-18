
// create svg

var w = 500;
var h = 50;
var dataset = [ 5, 10, 15, 20, 25 ];

var svg = d3.select("body").append("svg")
  .attr("width", w)
  .attr("height",h);

var circles = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle"); // bind data to circle

circles.attr("cx", function(d,i){ // determine center of circle
  return (i*50) + 25; //i = index 0,1,2,3,4
;})
  .attr("cy", h/2) // center of circle
  .attr("r", function(d){
    return d; // radius = d
  })
  .attr("fill","yellow")
  .attr("stroke","orange")
  .attr("stroke-width", function(d){
    return d/2;
  });
