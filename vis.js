// d3 based selection
d3.select("body")
  .append("p")
  .text("New paragraph!");

// working with csv

var df; // declare global variable


// use d3.tsv() for tsv viles
d3.csv("TNFdata.csv", function( error, data){
  if (error){
    console.log(error); //log error
  } else {
    console.log(data)
  }
  df = data; //after loading dataset, copy
  generateVis();// call other functions after loading
  hideLoadingMsg(); // depend on data being present
});


// working with JSON
// d3.json('somejson.json',function(json)){
//   console.log(json);
// }
