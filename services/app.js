const express = require('express')
const bodyParser = require('body-parser')
const ejs =require('ejs')
const port = 3000


//Initialisation de l'application express
const app = express()
//Configuration de l'application pour utiliser EJS come moteur de template
app.set("view engine","ejs")

app.use(express.static('public'))
/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/


//-----------------------------Middleware body-parser----------------------------------

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})

//----------------------------Création des routes pour les pages----------------------------------
//Définition des routes pour afficher le template 
//Respond to POST request on the root route (/), the application’s home page:
  
  app.get("/", (req, res) => {
    res.render("index")
  })

  app.get("/map", (req, res) => {
    res.render("map")
  })
  app.get("/acceuil", (req, res) => {
    res.render("acceuil")
  })
app.get("/editprofil", (req, res) => {
    res.render("editprofil")
  })
  /*
  //Respond to a PUT request to the /user route:
  
  app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
  })
 // Respond to a DELETE request to the /user route:
  
  app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
  })
*/
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})