
let data = {};
data = getUniverse([dcData, marvelData]);
// data = getUniverse([dcData.slice(0,50)]);

document.addEventListener("DOMContentLoaded", ()=>{

  const width = 800;
  const height = 800;
  const radius = Math.min(width, height) / 2;
  const color = d3.scaleOrdinal(d3.schemeSet3);

  const format = d3.format(",d")
  // get svg tag from within body
  // creates g tag within the svg
  const g = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // d3.partition() helps us organize data for sunbursts
  const partition = d3.partition()
    .size([2 * Math.PI, radius]);


  // d3.hiearchy converts our node like obj into d3 hiearchy object
  // sum goes through each node and sums it up
  let root = d3.hierarchy(data)
    .sum(function (d) { return d.value })
    .sort((a, b) => b.value - a.value);

  partition(root);

  // d3.arc() calculates the size of each arc based on our JSON data
  // we have d.x0... after we ran d3.partition()
  var arc = d3.arc()
    .startAngle(function (d) { return d.x0 })
    .endAngle(function (d) { return d.x1 })
    .innerRadius(function (d) { return d.y0 })
    .outerRadius(function (d) { return d.y1 });

  // we have root.descendants() after we ran d3.hiearchy
  g.selectAll("g")
    .data(root.descendants().filter(d => d.depth))
    .enter().append('g').attr("class", "nodeLabel")
    .append('path')
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("d", arc)
    .style('stroke', '#fff')
    .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
    .append("title")
    .text(d => {
      if (d.data.type === "name") {
          return `${d.ancestors().map(d => d.data.name).reverse().join("/")}`;
        } else {
          return `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`;
        }
      }
    );
  
});
