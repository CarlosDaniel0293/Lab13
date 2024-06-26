const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const gameController = require('./controllers/gameController');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
        console.log('Error al conectar a MongoDB: ', error);
    });

app.get('/api/games', gameController.getGames);
app.get('/api/games/:id', gameController.getGameById);
app.post('/api/games', gameController.createGame);
app.put('/api/games/:id', gameController.updateGame);
app.delete('/api/games/:id', gameController.deleteGame);

app.listen(port, () => {
    console.log('Servidor backend en funcionamiento en el puerto', port);
});
