
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

    const data = getUniverse(filterObj.getData());

    // d3.hiearchy converts our node like obj into d3 hiearchy object
    // sum goes through each node and sums it up

    let root = d3.hierarchy(data)
        .sum(function (d) { return d.value }) 
        .sort((a, b) => b.value - a.value);

    partition(root);

    // debugger;
    
    partition(root);

    // legend

    // const names = [];

    // function getNames(node) {
    //     if (node.children) {
    //         if(node.data.type!=="year"){
    //             names.push(node.data.name);
    //         }
    //         node.children.forEach(function (childNode) { getNames(childNode); });
    //     }
    // }

    // getNames(root);

    // function getuniqueNames(namesArr){
    //     const uNames = []
    //     namesArr.forEach((name, i) => {
    //         if(namesArr.indexOf(name) === i){
    //             uNames.push(name);
    //         }
    //     });
    //     return uNames;
    // }

    // const uNames = getuniqueNames(names);

    
    // get svg tag from within body
    // creates g tag within the svg
    g = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g") 
        .attr("transform", `translate(${width / 2},${width / 2})`);


    // we have root.descendants() after we ran d3.hiearchy

            // .data(root.descendants().filter(d => d.depth))

    g.selectAll("g")
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


    d3.selectAll(".universe").on("click", function(d,i) {
        filterObj.chooseUniverse(this.value);
        updateChart();
    });

    d3.selectAll(".select").on("change", function(d,i){
        filterObj.alterFilter(this.name, this.value);
        updateChart();
    });

}

const updateChart = () => {
    let newroot = d3.hierarchy(getUniverse(filterObj.getData()))
        .sum(function (d) { return d.value })
        .sort((a, b) => b.value - a.value);


    partition(newroot);

    const newDoughnut = g.selectAll("g")   
        .data(newroot.descendants().filter(d => d.depth));

    newDoughnut.exit().remove();
    
    d3.selectAll('path').remove();

    newDoughnut.enter().merge(newDoughnut).append("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("d", arc)
        .style('stroke', '#FFFFFF')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        .append("title")
        .text(d => {
            if (d.data.type === "name") {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                let name = labelString[labelString.length-1];
                return `${labelString.slice(1, labelString.length - 1).join("/")}\n${name} `;

                // return `${d.ancestors().map(d => d.data.name).reverse().join("/")}`;
            } else {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                return `${labelString.slice(1).join("/")}\n${format(d.value)} Character(s)`;
            }
        });
    newDoughnut.transition().duration(500).attr("d", arc);
}
