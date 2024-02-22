import mongoose, { Mongoose } from 'mongoose'
import slug from 'mongoose-slug-generator'

//Connection à la mongodb
mongoose.connect('mongodb+srv://chanezbegrar:WG4XpLAGxa7H5ykH@cluster0.prmxgob.mongodb.net/?retryWrites=true&w=majority')
.then( ()=> {
console.log("connected successful !")
})
.catch(()=> {
    console.log("Failed to connect !")
    })

//Slugs are particularly useful for creating clean,
// descriptive URLs for resources like blog posts, articles, or other
mongoose.plugin(slug)  


//Création du shéma .........
const userShema = new mongoose.Schema({
    prenom : {
        type : String,
        trim: true,
        required :[ true, "name required"]
    },

    nom : {
        type : String,
        trim: true,
        required :[ true, "name required"]
    },
    slug: {
        type: String,
        lowercase: true, 
         },

    email : {
        type : String,
        unique: true,
        required :[ true, "email required"]
    },
   

    password : {
        type : password,
        trim: true,
        required :[ true, "Password required"],
        minLength : [6,"Too short password !"]
    },

    dateBorn : {
        type : String,
        

    },

    role :{
        type : String,
        enum :['user','admin'],
        default : user
    },

    profilImg : String,
   

},
{timestamps :true}
)

const users = new Mongoose.models("users",userShema)
module.exports = users