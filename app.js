const express = require('express');

const app =express();
const main = require('./db.js');
const iwe = require ('./models/iwe.js')
const dotenv = require ('dotenv')
 const ejs = require('ejs');
const { urlencoded } = require('express');
dotenv.config();

main().catch(err => console.log(err));
const PORT = process.env.PORT||3000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

//static pages

//add note
app.get('/iwe/addNote',(req,res) =>{
    res.render('addNote',{pageTitle:'Add note',})
    })
    //update note
    app.get('/iwe/update/:id',(req,res) =>{
        res.render('updateNote',{pageTitle:'Update note',})
        })

//Endpoints
//get all notes
app.get('/', async( req,res) => {
 const allNotes = await iwe.find()
res.render('index',{pageTitle:'Iwè', allNotes})
})

//get one note
app.get('/iwe/:id', async (req,res) =>{
const id = req.params.id;
   const oneNote = await iwe.findById(id)
    res.render('oneNote',{pageTitle:'One note', oneNote})
    })

    // delete note
    app.delete('/iwe/:id', async (req,res) =>{
        const id = req.params.id;
           const oneNote = await iwe.findByIdAndDelete(id)
            })

//update Note
app.put('/iwe/update/:id', async (req,res) => {
    const id = req.params.id
   const updateInfo = {
       title:req.body.title,
        content:req.body.content
    }   
const updReq = await iwe.findByIdAndUpdate(id, updateInfo);
})

//addNote
app.post('/iwe/addNote', async (req,res) =>{
    const newNote ={
        title:req.body.title,
        content:req.body.content
    }
    const addNote = await iwe.create(newNote)
   
         res.redirect('/')   
    
    })



app.listen(PORT,() =>{
    console.log(`Server is runing on  http://localhost:${PORT}`);
}) 