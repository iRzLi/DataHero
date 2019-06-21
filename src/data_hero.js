
// let data = {};
// data = getUniverse([dcData, marvelData]);
// data = getUniverse([dcData.slice(0,50)]);

const customDCData = []
const customMarvelData = [];

dcData.forEach(character => {
  if(character.YEAR>=2000){
    customDCData.push(character);
  }
})
marvelData.forEach(character => {
  if (character.YEAR >= 2000) {
    customMarvelData.push(character);
  }
})


// const filterObj = new filter(dcData, marvelData);

// const filterObj = new filter(customDCData, customMarvelData);

const filterHash = { 
  universe: "both",
  SEX: "all", 
  ALIGN: "all", 
  ALIVE: "all" 
};

document.addEventListener("DOMContentLoaded", ()=>{

  draw();

  document.onmousemove = e => {
    document.getElementById("tooltip").style.left = e.pageX+10 +"px";
    document.getElementById("tooltip").style.top = e.pageY-30 + "px";
  }
});

