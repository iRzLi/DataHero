
const width = 800;
const height = 800;
const radius = Math.min(width, height) / 2;
const color = d3.scaleOrdinal(d3.schemeSet3);
const format = d3.format(",d")
let g = null;

// d3.partition() helps us organize data for sunbursts
const partition = d3.partition()
    .size([2 * Math.PI, radius]);

// const partitionLayout = d3.partition();



// d3.arc() calculates the size of each arc based on our JSON data
// we have d.x0... after we ran d3.partition()
const arc = d3.arc()
    .startAngle(function (d) { return d.x0 })
    .endAngle(function (d) { return d.x1 })
    .innerRadius(function (d) { return d.y0 })
    .outerRadius(function (d) { return d.y1 });



const draw = (filterObj) => {

    // const data = getUniverse(filterObj.getData());

<<<<<<< HEAD
=======
    const data = getData(customDCData, customMarvelData, filterHash);

>>>>>>> test-val0
    // d3.hiearchy converts our node like obj into d3 hiearchy object
    // sum goes through each node and sums it up

    let root = d3.hierarchy(data)
        .sum(function (d) { return d.value }) 
        .sort((a, b) => b.value - a.value);

    partition(root);


    g = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g") 
        .attr("transform", `translate(${width / 2},${width / 2})`);


    g.selectAll("path")
        .data(root.descendants().filter(d => d.depth))
        .enter().append("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("d", arc)
        .style('stroke', '#FFFFFF')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        .append("title")
        .text(d => {
            if (d.data.type === "name") {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                let name = labelString[labelString.length - 1];
                return `${labelString.slice(1, labelString.length - 1).join("/")}\n${name} `;
            } else {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                return `${labelString.slice(1).join("/")}\n${format(d.value)} Character(s)`;
            }
        });


    
    g.selectAll("path").append("text").attr("dy", ".35em")
        .text(function (d) { return d.parent ? d.data.name : ""; })
        .attr("id", function (d) { return "w" + d.data.name; });


    d3.selectAll(".universe").on("change", function(d,i) {
<<<<<<< HEAD
        filterObj.chooseUniverse(this.value);
=======
        filterHash.universe = this.value;
        // filterObj.chooseUniverse(this.value);
>>>>>>> test-val0
        updateChart();
    });

    d3.selectAll(".select").on("change", function(d,i){
<<<<<<< HEAD
=======
        filterHash[this.name] = this.value;
>>>>>>> test-val0
        filterObj.alterFilter(this.name, this.value);
        updateChart();
    });

}

const updateChart = () => {

    let newroot = d3.hierarchy(getData(customDCData, customMarvelData, filterHash))
        .sum(function (d) { return d.value })
        .sort((a, b) => b.value - a.value);


    partition(newroot);

    const newDoughnut = g.selectAll("path")
        .data(newroot.descendants().filter(d => d.depth));


    newDoughnut.exit().remove();

<<<<<<< HEAD
    newDoughnut.enter().merge(newDoughnut).append("path")
=======
    d3.selectAll("title").remove();


    d3.selectAll("path").enter().merge(newDoughnut)
>>>>>>> test-val0
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("d", arc)
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        .append("title")
        .text(d => {
            if (d.data.type === "name") {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                let name = labelString[labelString.length-1];
                return `${labelString.slice(1, labelString.length - 1).join("/")}\n${name} `;
            } else {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                return `${labelString.slice(1).join("/")}\n${format(d.value)} Character(s)`;
            }
        });

<<<<<<< HEAD
    

    newDoughnut.selectAll("path").transition().duration(500).attr("d", arc);
=======

    d3.selectAll("path")
        .transition()
        .duration(1000)
        .attrTween("d", function(d){
            const interpolate =  d3.interpolate(d.x0,d.x1);
            function tween(t) {
                d.x1 = interpolate(t);
                return arc(d);
            }
            return tween; 
        });
>>>>>>> test-val0
}
