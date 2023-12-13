    const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');

    const app = express();
    const port = 3000;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cors());

    mongoose.connect('mongodb://mongo:27017/namesDB', { useNewUrlParser: true, useUnifiedTopology: true });

    const NameSchema = new mongoose.Schema({
        name: String
    });

    const NameModel = mongoose.model('Name', NameSchema);

    app.get('/', (req, res) => {
        res.send('Funcionamiento.');
    });

    app.post('/api/saveName', async (req, res) => {
        const { name } = req.body;
        const newName = new NameModel({ name });
        await newName.save();
        res.send('Nombre guardado con éxito.');
    });


    app.listen(port, () => {
        console.log(`API running at http://localhost:${port}`);
    });

    // Ruta para obtener todos los nombres guardados
    app.get('/api/getNames', async (req, res) => {
        try {
            const names = await NameModel.find();
            res.send(names);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

