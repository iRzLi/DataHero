
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

const filterObj = new filter(customDCData, customMarvelData);

const filterHash = { 
  universe: "both",
  SEX: "all", 
  ALIGN: "all", 
  ALIVE: "all" 
};

document.addEventListener("DOMContentLoaded", ()=>{
  // draw(filterObj);

  draw();

  // uNames = getuniqueNames(names);




});

const names = [];

let uNames = null;

function getNames(node) {
  if (node.children) {
    node.children.forEach(function (childNode) { getNames(childNode); });
      if (node.data.type !== "year") {
        names.push(node.data.name);
      }
  }
}

function getuniqueNames(namesArr) {
  const uNames = []
  namesArr.forEach((name, i) => {
    if (namesArr.indexOf(name) === i) {
      uNames.push(name);
    }
  });
  return uNames;
}