const mongoose = require('mongoose');


const dbConnection = async() => {
    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Conectado a la db de forma exitosa');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la DB');
    }

}



module.exports = {
    dbConnection
}