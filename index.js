const express = require('express');
const cors = require('cors'); // Importar cors

const app = express();

app.use(cors()); // Usar cors

app.use(express.json());

const estudiantes = [
    {id: 1, nombre: 'Jorge', edad: 47, suscrito: false},
    {id: 2, nombre: 'Jose Antonio', edad: 19, suscrito: true},
    {id: 3, nombre: 'Manuela', edad: 22, suscrito: true},
    {id: 4, nombre: 'Andresita', edad: 18, suscrito: true},
    {id: 5, nombre: 'Manuel Angel', edad: 28, suscrito: false},
    {id: 6, nombre: 'Perro Mascota', edad: 3, suscrito: false}
];

app.get('/', (req, res) => {
    res.send('Node JS api - Esta es la API de ejemplo creada por Jorge Vega');
});

app.get('/api/estudiantes', (req, res) => {
    res.send(estudiantes);
});

app.get('/api/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(c => c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send('estudiante no encontrado');
    res.send(estudiante);
});

app.post('/api/estudiantes', (req, res) => {
    const estudiante = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        suscrito: req.body.suscrito === true
    };
    estudiantes.push(estudiante);
    res.send(estudiante);
});

app.delete('/api/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(c => c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send('estudiante no encontrado');

    const index = estudiantes.indexOf(estudiante);
    estudiantes.splice(index, 1);
    res.send(estudiante);
});

const port = process.env.PORT || 8090;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));
