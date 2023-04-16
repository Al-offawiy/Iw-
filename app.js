const express = require('express');

const app =express();

const dotenv = require ('dotenv')
 const ejs = require('ejs');
const { urlencoded } = require('express');
dotenv.config();
const prisma = require('./db/index')
const PORT = process.env.PORT||3000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

//static pages

//add note
app.get('/addNote',(req,res) =>{
    res.render('addNote',{pageTitle:'Add note',})
    })
    

//Endpoints
//get all notes
app.get('/', async( req,res) => {
 const allNotes =  await prisma.notes.findMany();
res.render('index',{pageTitle:'Iwè', allNotes})
})


//get one note
app.get('/iwe/:id', async (req,res) =>{
const id = parseInt(req.params.id);
if (!Number.isInteger(id)) {
  return res.status(400).send('Invalid id parameter');
}
   const oneNote = await prisma.notes.findUnique({
    where: { 
      id:id
    },
  });
  res.render('oneNote',{pageTitle:'One note', oneNote})
    });


    // delete note
    app.delete('/iwe/:id', async (req,res) =>{
      const id = parseInt(req.params.id);
      if (!Number.isInteger(id)) {
        return res.status(400).send('Invalid id parameter');
      }
      try {
        const oneNote =  await prisma.notes.delete({
           where: { 
            id: id
          } 
        });
        res.status(200).json ({message : 'Note has been deleted' })  
      } 
      catch (error) {
        res.status(400).json({error:'Note not deleted'})  
      }
        
            })


//update Note
app.put('/update/:id', async (req,res) => {
  const id = parseInt(req.params.id);
  

  if (!Number.isInteger(id)) {
    return res.status(400).send('Invalid id parameter');
  }
console.log(id)
    const { title, content } = req.body;
    try{
   const updReq  = await prisma.notes.update({
      where: { id: id},
      data: { title, content},
    });
    res.status(200).json({ message :"update successful"})
  }
  catch(error){
  res.status(400).json({error:"update unsuccessful"})
   }       
    
})



//update note
app.get('/update/:id',(req,res) =>{
  res.render('updateNote',{pageTitle:'Update note', })
  })

//addNote
app.post('/addNote', async (req,res) =>{
    const {title, content} = req.body;
    const addNote = await prisma.notes.create({
      data: { title, content},
    });
         res.redirect('/')   
    })


app.listen(PORT,() =>{
    console.log(`Server is runing on  http://localhost:${PORT}`);
}) 