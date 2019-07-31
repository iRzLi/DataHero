const hashData = {
    "Static Data Values": "",
    "Characters": 0,
    "DC": customDCData.length,
    "Marvel": customMarvelData.length,
    "Unknown Sex": 0,
    "Female": 0,
    "Male": 0,
    "Unknown Alignment": 0,
    "Neutral": 0,
    "Good": 0,
    "Bad": 0,
    "Deceased": 0,
    "Living": 0,
}

hashData["Characters"] = hashData["DC"] + hashData["Marvel"];


hashData["Male"] = (
    customDCData.filter((character) => {
        if (character.SEX === "Male Characters") return character;
    }).length 
    +
    customMarvelData.filter((character) => {
        if (character.SEX === "Male Characters") return character;
    }).length 
)

hashData["Female"] = (
    customDCData.filter((character) => {
        if (character.SEX === "Female Characters") return character;
    }).length
    +
    customMarvelData.filter((character) => {
        if (character.SEX === "Female Characters") return character;
    }).length
);

hashData["Unknown Sex"] = (
    customDCData.filter((character) => {
        if (character.SEX !== "Male Characters" && character.SEX !== "Female Characters") return character;
    }).length
    +
    customMarvelData.filter((character) => {
        if (character.SEX !== "Male Characters" && character.SEX !== "Female Characters") return character;
    }).length
);

hashData["Unknown Alignment"] = (
    customDCData.filter(c => {
        if (c.ALIGN !== "Neutral Characters" && c.ALIGN !== "Good Characters" && c.ALIGN !== "Bad Characters") return c;
    }).length
    +
    customMarvelData.filter(c => {
        if (c.ALIGN !== "Neutral Characters" && c.ALIGN !== "Good Characters" && c.ALIGN !== "Bad Characters") return c;
    }).length
);

hashData["Neutral"] = (
    customDCData.filter(c => {
        if (c.ALIGN === "Neutral Characters") return c;
    }).length
    +
    customMarvelData.filter(c => {
        if (c.ALIGN === "Neutral Characters") return c;
    }).length
);

hashData["Good"] = (
    customDCData.filter(c => {
        if (c.ALIGN === "Good Characters") return c;
    }).length
    +
    customMarvelData.filter(c => {
        if (c.ALIGN === "Good Characters") return c;
    }).length
);

hashData["Bad"] = (
    customDCData.filter(c => {
        if (c.ALIGN === "Bad Characters") return c;
    }).length
    +
    customMarvelData.filter(c => {
        if (c.ALIGN === "Bad Characters") return c;
    }).length
);

hashData["Living"] = (
    customDCData.filter((c) => {
        if (c.ALIVE === "Living Characters") return c;
    }).length
    +
    customMarvelData.filter((c) => {
        if (c.ALIVE === "Living Characters") return c;
    }).length
);

hashData["Deceased"] = (
    customDCData.filter((c) => {
        if (c.ALIVE === "Deceased Characters") return c;
    }).length
    +
    customMarvelData.filter((c) => {
        if (c.ALIVE === "Deceased Characters") return c;
    }).length
);