// width and barHeight

var w = 500;
var h = 50 ;
var barPadding = 6;

// define dataset
var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

// create svg element
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height",h);

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d,i){
    return i* (w/dataset.length) - barPadding; //bar with 20 plus 1 for padding
  })
  .attr("y", function(d){
    return h - d;
  })
  .attr("width", w/dataset.length - barPadding)
  .attr("height", function(d){
    return d;
  })
  .attr("fill", function(d){
    return "rgb(0, 0, "+ (d*10) + ")";
  });

  svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
      return d;
    })
    .attr("x", function(d,i){
      return i * (w/dataset.length) + (w/dataset.length - barPadding)/2;
    })
    .attr("y", function(d){
      return h - (d) + 15;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");
