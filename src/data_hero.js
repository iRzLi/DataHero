
// let data = {};
// data = getUniverse([dcData, marvelData]);
// data = getUniverse([dcData.slice(0,50)]);

const filterObj = new filter(dcData, marvelData);

document.addEventListener("DOMContentLoaded", ()=>{
  draw(filterObj);

  // d3.selectAll(".universe").on("click", function (d, i) {
  //   filterObj.chooseUniverse(this.value);
  //   d3.selectAll("g").remove();
  //   draw(filterObj);
  // });

  // d3.selectAll(".select").on("change", function (d, i) {
  //   filterObj.alterFilter(this.name,this.value);
  //   d3.selectAll("g").remove();
  //   draw(filterObj);
  // });


});

