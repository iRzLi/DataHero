class filter{
    constructor(dcData, marvelData){
        this.dcData = dcData;
        this.marvelData = marvelData;
        this.filteredDC = dcData;
        this.filteredMarvel = marvelData;
        this.filter = {universe:"both", SEX:"", ALIGN: "", ALIVE: ""};
        this.getData = this.getData.bind(this);
        this.chooseUniverse = this.chooseUniverse.bind(this);
        this.decideUniverse = this.decideUniverse.bind(this);
        this.alterFilter = this.alterFilter.bind(this);
        this.filterData = this.filterData.bind(this);
        this.filterSex = this.filterSex.bind(this);
        this.filterAlign = this.filterAlign.bind(this);
        this.filterAlive = this.filterAlive.bind(this);
        this.universe = [this.filteredDC, this.filteredMarvel];
    }

    getData(){
        this.filterData();
        this.decideUniverse();
        return this.universe;
    }

    decideUniverse(){
        if (this.filter.universe === "marvel") {
            this.universe = [[], this.filteredMarvel];
        } else if (this.filter.universe === "dc") {
            this.universe = [this.filteredDC, []];
        } else {
            this.universe = [this.filteredDC, this.filteredMarvel];
        }
    }

    chooseUniverse(universe){
        this.filter.universe = universe;
    }

    alterFilter(name, value){
        this.filter[name] = value;
    }

    filterData(){
        this.filteredDC = this.dcData;
        this.filteredMarvel = this.marvelData;
        this.filterSex();
        this.filterAlign();
        this.filterAlive();
    }

    filterSex(){
        if(this.filter.SEX==="male"){
            this.filteredDC = this.filteredDC.filter((character)=>{
                if (character.SEX === "Male Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.SEX === "Male Characters") return character;
            });
        } else if (this.filter.SEX === "female"){
            this.filteredDC = this.filteredDC.filter((character)=>{
                if (character.SEX === "Female Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.SEX === "Female Characters") return character;
            });
        } else if (this.filter.SEX === "unknown"){
            this.filteredDC = this.filteredDC.filter((character)=>{
                if (character.SEX !== "Male Characters" && character.SEX !== "Female Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.SEX !== "Male Characters" && character.SEX !== "Female Characters") return character;
            });
        } else {
            this.filteredDC;
            this.filteredMarvel;
        }
    }

    filterAlign(){
        if(this.filter.ALIGN === "good"){
            this.filteredDC = this.filteredDC.filter((character) => {
                if (character.ALIGN === "Good Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.ALIGN === "Good Characters") return character;
            });

        } else if (this.filter.ALIGN === "evil") {
            this.filteredDC = this.filteredDC.filter((character) => {
                if (character.ALIGN === "Bad Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.ALIGN === "Bad Characters") return character;
            });
        } else if (this.filter.ALIGN === "neutral") {
            this.filteredDC = this.filteredDC.filter((character) => {
                if (character.ALIGN === "Neutral Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.ALIGN === "Neutral Characters") return character;
            });

        } else if (this.filter.ALIGN === "unknown") {
            this.filteredDC = this.filteredDC.filter((character) => {
                if (character.ALIGN !== "Neutral Characters" && character.ALIGN !== "Good Characters" && character.ALIGN !== "Bad Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.ALIGN !== "Neutral Characters" && character.ALIGN !== "Good Characters" && character.ALIGN !== "Bad Characters") return character;
            });
        } else {
            this.filteredDC;
            this.filteredMarvel;
        }
    }

    filterAlive(){
        if (this.filter.ALIVE === "living") {
            this.filteredDC = this.filteredDC.filter((character) => {
                if (character.ALIVE === "Living Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.ALIVE === "Living Characters") return character;
            });
        } else if (this.filter.ALIVE === "deceased") {
            this.filteredDC = this.filteredDC.filter((character) => {
                if (character.ALIVE === "Deceased Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.ALIVE === "Deceased Characters") return character;
            });
        } else if (this.filter.ALIVE === "unknown") {
            this.filteredDC = this.filteredDC.filter((character) => {
                if (character.ALIVE !== "Living Characters" && character.ALIVE !== "Deceased Characters") return character;
            });
            this.filteredMarvel = this.filteredMarvel.filter((character) => {
                if (character.ALIVE !== "Living Characters" && character.ALIVE !== "Deceased Characters") return character;
            });
        } else {
            this.filteredDC;
            this.filteredMarvel;
        }
    }



}