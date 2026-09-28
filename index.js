import express from 'express';
const app = express()
const port = 3000

app.use(express.json())


let personas =
    [{id:1 , nombre: 'juan' , edad:15},
    {id:2 , nombre: 'ana' , edad:12}]

app.get('/', (req, res) => {
res.send('ejemplo de api rest');
});

app.get('/personas', (req, res) => {
res.json(personas);
});

app.get('/personas/:id', (req, res) => {
const persona = personas.find(p => p.id == req.params.id)
persona ? res.json(persona) : res.status(404).send('persona no encontrada')
});


app.post('/personas', (req, res) => {
const nvoid = personas.length + 1
const nvapersona = {
    id : nvoid,
    nombre : req.body.nombre,
    edad : req.body.edad
}
personas.push(nvapersona)
res.status(201).json(nvapersona)
});

app.put('/personas', (req, res) => {
console.log(req.query)
console.log(req.body)
const persona = personas.find(p => p.id == req.query.id)
if(!persona) {return  res.status(404).send('req no encontrado')}
persona.nombre = req.body.nombre
persona.edad = req.body.edad
res.json(persona).send('actualisando persona')
});

app.delete('/personas/:id', (req, res) => {
console.log(req.params.id)
const indice = personas.findIndex(p => p.id == (req.params.id))
if(indice == -1){return res.status(404).send('no existe')}
personas.splice(indice,1)
res.status(204).send('SE ELIMINO PERSONA')

});


app.listen(port, () => {
    console.log(`servidor escuchando en http://localhost:${port}`)
})

app.use((req,res) => {
    res.status(404).send('la pagina no existe')
})
