
const getUniverse = (dataArr) => {
    let rootData = {
        name: "Characters",
        children: [],
    };
    rootData.children.push({
        name: "DC",
        // value: dataArr[0].length,
        type: "Universe",
        children:[],
    });
    rootData.children.push({
        name: "Marvel",
        // value: dataArr[1].length,
        type: "Universe",
        children: [],
    });


    const rootData2 = {
        name: "Characters",
        children: [],
    }

    for (let i = 0; i < rootData.children.length; i++) {
        if(dataArr[i].length){
            rootData.children[i].children = getSex(dataArr, i);
            rootData2.children.push(rootData.children[i]);
        }
    }
    // debugger
    return rootData2;
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

    const sexData2 = [];

    for (let i = 0; i < sexData.length; i++) {
        if(newDataArr[i].length){
            sexData[i].children = getAlignment(newDataArr, i)
            sexData2.push(sexData[i]);
        }
    }
    return sexData2;
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

    const alignmentData2 = []

    for (let i = 0; i < alignmentData.length; i++) {
        if(newDataArr[i].length){
            alignmentData[i].children = getStatus(newDataArr, i)
            alignmentData2.push(alignmentData[i]);
        }
    }
    return alignmentData2;

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

    const statusData2 = [];

    for (let i = 0; i < statusData.length; i++) {
        if(newDataArr[i].length){
            statusData[i].children = getYear(newDataArr, i);
            statusData2.push(statusData[i]);
        }
    }
    return statusData2;

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
            type:"year",
            children: [],
        })
    });


    // "" isn't part of the unique yers arr
    // get array of all undefined years
    deepArr = dataArr[index].filter(c=>{
        if(!c.YEAR) {
            return c;
        }
    });
    newDataArr.push(deepArr);

    yearData.push({
        name:"Unknown Year",
        // value: deepArr.length,
        type: "year",
        children: [],
    });

    const yearData2 = [];
    for (let i = 0; i < yearData.length; i++) {
        if(newDataArr[i].length){
            yearData[i].children = getName(newDataArr, i);
            yearData2.push(yearData[i]);
        }
    }
    return yearData2;
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
