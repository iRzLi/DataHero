
const width = 700;
const height = 700;
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

const arcHover = d3.arc()
    .startAngle(function (d) { return d.x0*.99 })
    .endAngle(function (d) { return d.x1*1.01 })
    .innerRadius(function (d) { return d.y0*.99 })
    .outerRadius(function (d) { return d.y1*1.01 });

// const draw = (filterObj) => {

const draw = () => {

    // const data = getUniverse(filterObj.getData());

    const data = getData(customDCData, customMarvelData, filterHash);

    // d3.hiearchy converts our node like obj into d3 hiearchy object
    // sum goes through each node and sums it up

    let root = d3.hierarchy(data)
        .sum(function (d) { return d.value }) 
        .sort((a, b) => b.value - a.value);

    partition(root);

    getNames(root);


    g = d3.select("#chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class", "chartG")
        .attr("transform", `translate(${width / 2},${width / 2})`);


    g.selectAll("path")
        .data(root.descendants().filter(d => d.depth))
        .enter().append("path")
        .attr("class", "pathNode")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("d", arc)
        .style('stroke', '#FFFFFF')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        .on("mouseover", function(d){
            // Updating z-index for a slice from Evil Closet Monkey
            // Slices are on top of ealier slices so just create a new one
            // https://stackoverflow.com/questions/13595175/updating-svg-element-z-index-with-d3
            if (d.data.type !== "name"){
                g.append("path")
                    .attr("d", d3.select(this).attr("d"))
                    .attr("id", "sliceHover")
                    .style("fill", "none")
                    .style("stroke", "#9400D3")
                    .style("stroke-width", 2);
            }
            
        })
        .on("mouseleave", function (d) {
            g.select("#sliceHover").remove();
        })
        .text(d => {
            if (d.data.type === "name") {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                let name = labelString[labelString.length - 1];
                return `${labelString.slice(1, labelString.length - 1).join(" / ")} - \n${name} `;
            } else {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                return `${labelString.slice(1).join(" / ")} - \n ${format(d.value)} Character(s)`;
            }
        });


    const chartG = document.getElementsByClassName("chartG")[0];
    
    
    chartG.addEventListener("mouseover", e=>{
        const tt = document.getElementById("tooltip");
        let splitstring = e.target.innerHTML.split("<text")[0];
        tt.innerHTML = splitstring.split("-")[0] + "<br>" + splitstring.split("-")[1];
        tt.style.display= "block";
    })
    chartG.addEventListener("mouseleave", e => {
        const tt = document.getElementById("tooltip");
        tt.innerHTML = "";
        tt.style.display = "none";
    })


    uNames = getuniqueNames(names);
    // uNames.pop();
    // uNames.shift();
    // uNames.unshift(uNames.pop());
    uNames = uNames.reverse();


    // uNames = ["DC", "Marvel", "Male", "Female", "Unkown Sex", 
    //     "Good","Bad", "Neutral", "Unknown Alignment",
    //     "Living", "Deceased", "Unknown Status"];


    let translatex = 0;
    // translatey = 20;
    const gs = d3.select("#legend")
    .attr("width", 200)
    .attr("height", 600)
    .selectAll("g.name")
    .data(uNames).enter()
    .append("g")
    .attr("class", "name");

    d3.selectAll("g.name")
        .attr("transform", function (d) {
            return `translate(0,${translatex += 20})`;
        });

    gs.append("text")
        .style("fill", function(d){
            return color(d);
        })
        .text(function(d){
            return d +" : "+ hashData[d];
        });

    
    g.selectAll("path").append("text").attr("dy", ".35em")
        .text(function (d) { return d.parent ? d.data.name : ""; })
        .attr("id", function (d) { return "w" + d.data.name; });


    d3.selectAll(".universe").on("change", function(d,i) {
        filterHash.universe = this.value;
        // filterObj.chooseUniverse(this.value);
        updateChart();
    });

    d3.selectAll(".select").on("change", function(d,i){
        filterHash[this.name] = this.value;
        // filterObj.alterFilter(this.name, this.value);
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

    d3.selectAll("title").remove();


    d3.selectAll("path").enter().merge(newDoughnut)
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("d", arc)
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
        .text(d => {
            if (d.data.type === "name") {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                let name = labelString[labelString.length - 1];
                return `${labelString.slice(1, labelString.length - 1).join(" / ")} - \n${name} `;
            } else {
                let labelString = d.ancestors().map(d => d.data.name).reverse().join("/").split("/");
                return `${labelString.slice(1).join(" / ")} - \n ${format(d.value)} Character(s)`;
            }
        });


    d3.selectAll("path")
        .transition()
        .duration(2000)
        .attrTween("d", function(d){
            const interpolate =  d3.interpolate(d.x0,d.x1);
            function tween(t) {
                d.x1 = interpolate(t);
                return arc(d);
            }
            return tween; 
        });
}


const legend = () => {

}