const { io } = require('../index');
const Bands = require('../models/Bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand(new Band( 'Queen'));
bands.addBand(new Band( 'Heroes del Silencio'));
bands.addBand(new Band( 'Guns and Roses'));
bands.addBand(new Band( 'Metallica'));


io.on("connection", client => {
    console.log("New device connected!")

    client.emit('activeBands', bands.getBands());

    // print in the console when some device disconnects
    client.on("disconnect", data => {
        console.log("disconnected!")
    })

    // client.on('emitir-mensaje',(payload) => {
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });

    client.on('vote-band', (payload) => {
     
        bands.voteBand(payload.id);
        io.emit('activeBands', bands.getBands());
    });

    //Escuchar add-band
    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('activeBands', bands.getBands());
    });
    //delte band

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('activeBands', bands.getBands());
    }); 
})
