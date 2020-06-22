const express = require('express'); //importa libreria
const bodyparser = require('body-parser'); //importa libreria
const app = express();

const PORT = process.env.PORT || 3001;

let respuesta ={

    codigo: "200",
    mensaje: "Respuesta usuario",
    usuario: ''

};

let usuarios=[  {
  id: 1,
  nombre: 'Josue',
  apellido: 'Aquino',
  edad: 23,
  tieneRegistro: false

},
{
    id: 2,
    nombre: 'Teresa',
    apellido: 'Aquino',
    edad: 39,
    tieneRegistro: false  
  }
]

app.use(bodyparser.urlencoded({extend: false}));
app.use(bodyparser.json());//Formato Json

//obtener informacion
app.get('/usuario',  (req, res)=>{
//("[GET] Punto de usuario a la api usuario"
    res.send(usuarios);

});

//agregar informacion
app.post('/usuario', (req, res)=>{
const id = usuarios.map(e => e.id).reduce((o,e) => {return o > e ? o : e}) + 1

    //POST
   // res.send(usuarios);
   const usuario = {
    id: id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    tieneRegistro: req.body.tieneRegistro

   }
   usuarios.push(usuario); //agrega el usuario
   respuesta.usuario = usuario
   res.send(respuesta)
})

app.delete('/usuario/:idUser', (req,res) => {

  const idUser = req.params.idUser;
  respuesta.mensaje = `El id de usuario a borrar es ${idUser}`;
  const usuario = usuarios.find(e=>e.id===parseInt(idUser,10))
  const pos = usuarios.indexOf(usuario);
  usuarios.splice(pos,1) //elimina user
  respuesta.usuario = usuario
  res.send(respuesta);
 

})


app.put('/usuario/:idUser', (req,res) => {
const idUser = req.params.idUser;
  const usuarioNew = {
    id: idUser,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    tieneRegistro: req.body.tieneRegistro
   }
 

  respuesta.mensaje = `El id de usuario modificado es ${idUser}`;
  const usuario = usuarios.find(e=>e.id===parseInt(idUser,10))
  const pos = usuarios.indexOf(usuario);
  usuarios.splice(pos,1) //elimina user
  usuarios.push(usuarioNew)
  respuesta.usuario = usuarioNew
  res.send(respuesta);
 

})

app.listen(PORT, () => {

console.log(`Servidor iniciado en el puerto ${PORT}`);

})