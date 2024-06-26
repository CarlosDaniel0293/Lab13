const Game = require('../models/game');

// Obtener todos los videojuegos
exports.getGames = (req, res) => {
    Game.find()
        .then((games) => {
            res.json(games);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Obtener videojuego por ID
exports.getGameById = (req, res) => {
    Game.findById(req.params.id)
        .then((game) => {
            if(!game) {
                return res.status(404).json({ message: 'Videojuego no encontrado' });
            }
            res.json(game);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Crear videojuego
exports.createGame = (req, res) => {
    const newGame = new Game({
        title: req.body.title,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    });
    newGame.save()
        .then((game) => {
            res.status(201).json(game);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Actualizar videojuego existente
exports.updateGame = (req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((game) => {
            if(!game) {
                return res.status(404).json({ message: 'Videojuego no encontrado' });
            }
            res.json(game);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

// Eliminar videojuego existente
exports.deleteGame = (req, res) => {
    Game.findByIdAndDelete(req.params.id)
        .then((game) => {
            if (!game) {
                return res.status(404).json({ message: 'Videojuego no encontrado' });
            }
            res.json({ message: 'Videojuego eliminado correctamente' });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};
