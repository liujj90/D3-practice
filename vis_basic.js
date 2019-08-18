var dataset = [];
for (var i=0; i<25; i++) {
  var newNumber = Math.random()* 30;
  dataset.push(newNumber);
}
d3.select("body")
  .selectAll("div")
  .data(dataset)
  .enter()
  .append("div")
  .attr("class", "bar")
  .style("height", function(d){
    var barHeight = d*5;
    return barHeight + "px";
  });

  // .append("p")
  // .text(function(d){
  //   return "I can count up to " + d;
  // })
  // .style("color", function(d){
  //   if(d>15){
  //     return "red";
  //   } else {
  //     return "black";
  //   }
  // })
