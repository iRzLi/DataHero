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