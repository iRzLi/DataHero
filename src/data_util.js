
const getUniverse = (dataArr) => {
    let rootData = {
        name: "Characters",
        children: [],
    };
    rootData.children.push({
        name: "DC Universe",
        // value: dataArr[0].length,
        children:[],
    });
    rootData.children.push({
        name: "Marvel Universe",
        // value: dataArr[1].length,
        children: [],
    });
    for (let i = 0; i < rootData.children.length; i++) {
        if(dataArr[i]){
            rootData.children[i].children = getSex(dataArr, i);
        }
    }
    return rootData
};

const getSex = (dataArr, index) => {
    let sexData = [];
    let newDataArr = [];
    newDataArr.push(
        dataArr[index].filter((character)=>{
            if(character.SEX==="Male Characters") return character;
        })
    );

    newDataArr.push(
        dataArr[index].filter((character)=>{
            if(character.SEX==="Female Characters") return character;
        })
    );

    newDataArr.push(
        dataArr[index].filter((character)=>{
            if(character.SEX!=="Male Characters" && character.SEX!=="Female Characters") return character;
        })
    );

    sexData.push({
        name: "Male",
        // value: newDataArr[0].length,
        children: [],
    })
    sexData.push({
        name: "Female",
        // value: newDataArr[1].length,
        children: [],
    })
    sexData.push({
        name: "Unknown Sex",
        // value: newDataArr[2].length,
        children: [],
    })
    for (let i = 0; i < sexData.length; i++) {
        if(newDataArr[i]){
            sexData[i].children = getAlignment(newDataArr, i)
        }
    }
    return sexData;
};

const getAlignment = (dataArr, index)=>{
    let alignmentData = [];
    let newDataArr = [];
    newDataArr.push(dataArr[index].filter(c => {
        if(c.ALIGN==="Good Characters") return c;
    }));
    newDataArr.push(dataArr[index].filter(c => {
        if(c.ALIGN==="Bad Characters") return c;
    }));
    newDataArr.push(dataArr[index].filter(c => {
        if(c.ALIGN==="Neutral Characters") return c;
    }));
    newDataArr.push(dataArr[index].filter(c => {
        if(c.ALIGN!=="Neutral Characters" && c.ALIGN!=="Good Characters" && c.ALIGN!=="Bad Characters") return c;
    }));

    alignmentData.push({
        name: "Good",
        // value: newDataArr[0].length,
        children: [],
    });
    alignmentData.push({
        name: "Bad",
        // value: newDataArr[1].length,
        children: [],
    });
    alignmentData.push({
        name: "Neutral",
        // value: newDataArr[2].length,
        children: [],
    });
    alignmentData.push({
        name: "Unknown Alignment",
        // value: newDataArr[3].length,
        children: [],
    });
    for (let i = 0; i < alignmentData.length; i++) {
        if(newDataArr[i]){
            alignmentData[i].children = getStatus(newDataArr, i)
        }
    }
    return alignmentData;

}

const getStatus = (dataArr, index) => {
    let statusData = [];
    let newDataArr = [];
    newDataArr.push(dataArr[index].filter((c)=>{
        if(c.ALIVE==="Living Characters") return c;
    }));
    newDataArr.push(dataArr[index].filter((c)=>{
        if(c.ALIVE==="Deceased Characters") return c;
    }));
    newDataArr.push(dataArr[index].filter((c)=>{
        if(c.ALIVE!=="Living Characters" && c.ALIVE!=="Deceased Characters") return c;
    }));

    statusData.push({
        name: "Living",
        // value: newDataArr[0].length,
        children: [],
    });
    statusData.push({
        name: "Deceased",
        // value: newDataArr[1].length,
        children: [],
    });
    statusData.push({
        name: "Unknown Status",
        // value: newDataArr[2].length,
        children: [],
    });
    for (let i = 0; i < statusData.length; i++) {
        if(newDataArr[i]){
            statusData[i].children = getYear(newDataArr, i);
        }
    }
    return statusData;

};

const getYear = (dataArr, index) => {
    let yearData = [];
    let newDataArr = [];
    let uniqueYears = [];
    let years = [];
    dataArr[index].forEach(c => {
        years.push(c.YEAR)
    });
    years.forEach((year, i, arr)=>{
        if(year && arr.indexOf(year)===i){
            uniqueYears.push(year);
        }
    });

    // Populates newDataArr and adds to children arr of caller
    let deepArr = null;
    uniqueYears.forEach(y => {
        deepArr = dataArr[index].filter(c=>{
            if(c.YEAR===y) return c;
        });
        newDataArr.push(deepArr);
        yearData.push({
            name: y,
            // value: deepArr.length,
            children: [],
        })
    });


    // "" isn't part of the unique yers arr
    deepArr = dataArr[index].filter(c=>{
        if(!c.YEAR) {
            return c;
        }
    });
    newDataArr.push(deepArr);

    yearData.push({
        name:"Unknown Year",
        // value: deepArr.length,
        children: [],
    });

    for (let i = 0; i < yearData.length; i++) {
        if(newDataArr[i]){
            yearData[i].children = getName(newDataArr, i);
        }
    }
    return yearData;
}

const getName = (dataArr,index)=>{
    let nameData = [];
    dataArr[index].forEach(c =>{
        nameData.push({
            name: c.name,
            value: 1,
            type: "name",
        })
    });
    return nameData;
}
