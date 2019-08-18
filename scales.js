// // create scales
// var scale = d3.scale.linear()
//             .scale.domain([100,500]) // set input domain
//             .scale.range([10, 350]); // set output range
//
//
// scale(100); //returns 20
// scale(300); // returns 180
// scale(500); // returns 350


//scaling a scatterplot

var dataset = [
[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
[410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
[600, 150]
];

// retrieving max values
d3.max(dataset, function(d){ // get maximum from x
  return d[0]; // references first value in each subarray
})

d3.max(dataset, function(d){
  return d[1];
})


// set dynamic scales
var h = 500;
var w = 500;
var padding = 50; // add padding


var rscale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d){
              return d[1];
            })])
            .range([2,5])

// other scales: sqrt, pow, log, quantise, quantile, ordinal, category10, category 20, time,scale()
var yscale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d){
              return d[1];
            })])
            .range([h-padding, padding]); // flip y axis // build in padding

var xscale = d3.scaleLinear()
              .domain([d3.max(dataset, function(d){
                return d[0];
              }), 0 ])
              .range([w-padding, padding]); // build in padding here




// make scatterplot
var svg = d3.select("body").append("svg")
          .attr("width", w)
          .attr("height", h);

svg.selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle")
          .attr("cx", function(d){
            return xscale(d[0]); //returns scaled value
          })
          .attr("cy", function(d){
            return yscale(d[1]);
          })
          .attr("r", function(d){
            return rscale(d[1]);
          });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){return d[0] + ',' + d[1];})
    .attr("fill", "red")
    .attr("x", function(d){return xscale(d[0]);})
    .attr("y", function(d){return yscale(d[1]);});


// axes
//
var xAxis = d3.axisBottom(xscale)
              .ticks(5); // rougn number of ticks

var yAxis = d3.axisLeft(yscale)
              .ticks(5);

svg.append("g")// g now the axis
    .attr("class", "axis") // assign class attribute
    .attr("transform", "translate(0," + (h-padding) + ")") // push x axis to bottom
    .call(xAxis);  // generates axis within "g"

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);



// ADD the following to styles in index
// .axis path,
// .axis line{
//   fill:none;
//   stroke: black;
//   shape-rendering: crispEdges;
//   }
//   .axis text{
//     font-family:sans-serif;
//     font-size: 11px;
//   }
