const getData = (dcJson, marvelJson, filterHashObj) => {


    let rootData = {
        name: "Characters",
        children: [],
    };
    rootData.children.push({
        name: "DC",
        type: "Universe",
        children: [],
    });
    rootData.children.push({
        name: "Marvel",
        type: "Universe",
        children: [],
    });
    
    if (filterHashObj.universe === "both" ||
        filterHashObj.universe === "dc") {
        rootData.children[0].children = getSexValue(dcJson, true, filterHashObj);
        }
    else {
        rootData.children[0].children = getSexValue(dcJson, false, filterHashObj);
    }

    if (filterHashObj.universe === "both" ||
        filterHashObj.universe === "marvel") {
        rootData.children[1].children = getSexValue(marvelJson, true, filterHashObj);
    }
    else {
        rootData.children[1].children = getSexValue(marvelJson, false, filterHashObj);
    }

    return rootData;

}


const getSexValue = (dataArr, hasValue, filterHashObj) => {
    let sexData = [];
    let newDataArr = [];
    newDataArr.push(
        dataArr.filter((character) => {
            if (character.SEX === "Male Characters") return character;
        })
    );

    newDataArr.push(
        dataArr.filter((character) => {
            if (character.SEX === "Female Characters") return character;
        })
    );

    newDataArr.push(
        dataArr.filter((character) => {
            if (character.SEX !== "Male Characters" && character.SEX !== "Female Characters") return character;
        })
    );

    sexData.push({
        name: "Male",
        children: [],
    })
    sexData.push({
        name: "Female",
        children: [],
    })
    sexData.push({
        name: "Unknown Sex",
        children: [],
    })

    if ( hasValue && 
        (filterHashObj.SEX === "all" ||
            filterHashObj.SEX === "male")) {
        sexData[0].children = getAlignData(newDataArr[0], true, filterHashObj);
    }
    else {
        sexData[0].children = getAlignData(newDataArr[0], false, filterHashObj);
    }

    if (hasValue &&
        (filterHashObj.SEX === "all" ||
            filterHashObj.SEX === "female")) {
        sexData[1].children = getAlignData(newDataArr[1], true, filterHashObj);
    }
    else {
        sexData[1].children = getAlignData(newDataArr[1], false, filterHashObj);
    }

    if (hasValue &&
        (filterHashObj.SEX === "all" ||
        filterHashObj.SEX === "unknown")) {
        sexData[2].children = getAlignData(newDataArr[2], true, filterHashObj);
    }
    else {
        sexData[2].children = getAlignData(newDataArr[2], false, filterHashObj);
    }


    return sexData;
}


const getAlignData = (dataArr, hasValue, filterHashObj) => {
    let alignmentData = [];
    let newDataArr = [];
    newDataArr.push(dataArr.filter(c => {
        if (c.ALIGN === "Good Characters") return c;
    }));
    newDataArr.push(dataArr.filter(c => {
        if (c.ALIGN === "Bad Characters") return c;
    }));
    newDataArr.push(dataArr.filter(c => {
        if (c.ALIGN === "Neutral Characters") return c;
    }));
    newDataArr.push(dataArr.filter(c => {
        if (c.ALIGN !== "Neutral Characters" && c.ALIGN !== "Good Characters" && c.ALIGN !== "Bad Characters") return c;
    }));

    alignmentData.push({
        name: "Good",
        children: [],
    });
    alignmentData.push({
        name: "Bad",
        children: [],
    });
    alignmentData.push({
        name: "Neutral",
        children: [],
    });
    alignmentData.push({
        name: "Unknown Alignment",
        children: [],
    });

    if (hasValue &&
        (filterHashObj.ALIGN === "all" ||
        filterHashObj.ALIGN === "good")) {
        alignmentData[0].children = getStatusData(newDataArr[0], true, filterHashObj);
    }
    else {
        alignmentData[0].children = getStatusData(newDataArr[0], false, filterHashObj);
    }

    if (hasValue &&
        (filterHashObj.ALIGN === "all" ||
            filterHashObj.ALIGN === "evil")) {
        alignmentData[1].children = getStatusData(newDataArr[1], true, filterHashObj);
    }
    else {
        alignmentData[1].children = getStatusData(newDataArr[1], false, filterHashObj);
    }

    if (hasValue &&
        (filterHashObj.ALIGN === "all" ||
            filterHashObj.ALIGN === "neutral")) {
        alignmentData[2].children = getStatusData(newDataArr[2], true, filterHashObj);
    }
    else {
        alignmentData[2].children = getStatusData(newDataArr[2], false, filterHashObj);
    }

    if (hasValue &&
        (filterHashObj.ALIGN === "all" ||
            filterHashObj.ALIGN === "unknown")) {
        alignmentData[3].children = getStatusData(newDataArr[3], true, filterHashObj);
    }
    else {
        alignmentData[3].children = getStatusData(newDataArr[3], false, filterHashObj);
    }

    return alignmentData;
}


const getStatusData = (dataArr, hasValue, filterHashObj) => {
    let statusData = [];
    let newDataArr = [];
    newDataArr.push(dataArr.filter((c) => {
        if (c.ALIVE === "Living Characters") return c;
    }));
    newDataArr.push(dataArr.filter((c) => {
        if (c.ALIVE === "Deceased Characters") return c;
    }));
    newDataArr.push(dataArr.filter((c) => {
        if (c.ALIVE !== "Living Characters" && c.ALIVE !== "Deceased Characters") return c;
    }));

    statusData.push({
        name: "Living",
        children: [],
    });
    statusData.push({
        name: "Deceased",
        children: [],
    });
    statusData.push({
        name: "Unknown Status",
        children: [],
    });

    if (hasValue &&
        (filterHashObj.ALIVE === "all" ||
            filterHashObj.ALIVE === "living")) {
        statusData[0].children = getYearData(newDataArr[0], true);
    }
    else {
        statusData[0].children = getYearData(newDataArr[0], false);
    }

    if (hasValue &&
        (filterHashObj.ALIVE === "all" ||
        filterHashObj.ALIVE === "deceased")) {
        statusData[1].children = getYearData(newDataArr[1], true);
    }
    else {
        statusData[1].children = getYearData(newDataArr[1], false);
    }

    if (hasValue &&
        (filterHashObj.ALIVE === "all" ||
            filterHashObj.ALIVE === "")) {
        statusData[2].children = getYearData(newDataArr[2], true);
    }
    else {
        statusData[2].children = getYearData(newDataArr[2], false);
    }

    return statusData;
}

const getYearData = (dataArr, hasValue) => {
    let yearData = [];
    let newDataArr = [];
    let uniqueYears = [];
    let years = [];
    dataArr.forEach(c => {
        years.push(c.YEAR)
    });

    years.forEach((year, i, arr) => {
        if (year && arr.indexOf(year) === i) {
            uniqueYears.push(year);
        }
    });

    let deepArr = null;
    uniqueYears.forEach(y => {
        deepArr = dataArr.filter(c => {
            if (c.YEAR === y) return c;
        });
        newDataArr.push(deepArr);
        yearData.push({
            name: y,
            type: "year",
            children: [],
        })
    });

    deepArr = dataArr.filter(c => {
        if (!c.YEAR) {
            return c;
        }
    });
    newDataArr.push(deepArr);

    yearData.push({
        name: "Unknown Year",
        type: "year",
        children: [],
    });

    for (let i = 0; i < yearData.length; i++) {
        if (newDataArr[i].length) {
            yearData[i].children = getNameData(newDataArr, i, hasValue);
        }
    }
    return yearData;
}

const getNameData = (dataArr, index, hasValue) => {
    let nameData = [];
    dataArr[index].forEach(c => {

        if(hasValue){
            nameData.push({
                name: c.name,
                value: 1,
                type: "name",
            })
        } else {
            nameData.push({
                name: c.name,
                value: 0,
                type: "name",
            })
        }
    });

    return nameData;
}