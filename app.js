import  Express  from 'express'
import bodyParser from 'body-parser'
import ejs from 'ejs'
import bcrypt from 'bcrypt';
import path from 'path'
const port = 3000 
const app = Express()



//--------------------------Utilisation ejs------------------------------------------------- 
app.set("view engine","ejs")

app.use(Express.static('public'))

//--------------------------Routes ------------------------------------------------- 
app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/acceuil",(req,res)=>{
    res.render("acceuil")
})

app.get("/editprofil",(req,res)=>{
    res.render("editprofil")
})


//in memory 
const users =[]
app.use(Express.json()) //middleware to put any request in body

//--------------------------Inscription------------------------------------------------- 

app.post("/register",async (req,res)=>{
   try {
    const {email,password}= req.body
    //Find user 
    const findUser =users.find((data)=> email == data.email) //comparer l'email saisi par l'user avec les emails dans la db
    if (findUser) { 
        res.status(400).send("User already exists !") //si user existe alors erreur
    }
    //Hash password 
    const hashedPassword = await bcrypt.hash(password,10)
    users.push({email,password :hashedPassword})
    console.log(email,hashedPassword);
    res.status(201).send("Register successful !")
   } catch (error) {
    res.status(500).send({message : error.message})
   }
}) 
//--------------------------Inscription------------------------------------------------- 


//--------------------------------Authentification------------------------------------
app.post("/login",async (req,res) =>{
    try {
        const {email,password}=req.body
        //find user ..
        const findUser = users.find((data) => email == data.email )
        if (!findUser) {
            res.status(400).send("User or password wrong")
        }
        //Comparer le mot de passe entré avec le mot de passe stocké dans la base de données
        const passwordMatch = await bcrypt.compare(password,findUser.password)
        if (passwordMatch) {
            res.status(200).send("Login successful")
            //Génerer un token pour donner l'autorisation au user d'accéder à son profil
            //...................A compléter
        }else { res.status(400).send("User or password wrong") }

    } catch (error) {
       res.status(500).send({message : error.message}) 
    }
})
//--------------------------------Fin Authentification------------------------------------

app.listen(port, () => {
    console.log(`Chanez app listening on port http://localhost:${port}`)
  })


