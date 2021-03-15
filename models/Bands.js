const Band = require("./band");

class Bands {

    constructor(){
        this.bands = [];

    }

    addBand(band = new Band()){
        this.bands.push(band);
    }

    getBands(){
        return this.bands;
    } 

    deleteBand(id =''){
        this.bands= this.bands.filter(band => band.id != id);
        return this.bands;
    }
    voteBand(id = ''){
        this.bands = this.bands.map(banda => {
            if(banda.id == id){
                banda.votes++;
                return banda
            }else{
                return banda;
            }
        });
    }
}

module.exports= Bands;