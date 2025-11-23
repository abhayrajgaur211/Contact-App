const express =require("express")
const app=express()
const port=3000;
//////////////////////////////////////////////////////////////
//mongosh pakage-1
const mongoose=require("mongoose") // import mongose pakage
const Contact=require('./models/contact_models') // 4 here import contact_models

//data base connection-2
// 3 is in contact_models.js 
mongoose.connect('mongodb://127.0.0.1:27017/contacts-crud')
.then(() =>console.log("Database Connected."))
///////////////////////////////////////////////////////////////////

//middleware
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

/////////////////////////////////////////////////////////////////////////////////

app.get('/',async(req,res)=>{
    const contacts=await Contact.find()//Contact is define in import contact_model
    //res.json(kk)
    res.render('home',{contacts})
    })// home page
//////////////////////////////////////////////////////////////////////////////////////////
app.get('/show-contact/:id',async(req,res)=>{
    //const contact=await Contact.findOne({_id: req.params.id}) // first way
    const contact=await Contact.findById(req.params.id) //second way
    res.render('show-contact',{contact})
})// show single contact

////////////////////////////////////////////////////////////////////////////////////
app.get('/add-contact',(req,res)=>{res.render('add-contact')}) //open new contact form

////////////////////////////////////////////////////////////////////////////////
app.post('/add-contact',async(req,res)=>{
    /*const conract=await Contact.insertOne({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address
    })*/
                       ///////another method/////////
    await Contact.create(req.body)
    //res.send(req.body)
    res.redirect("/") // this code redirect our save data on home page
}) // Save contact to server

/////////////////////////////////////////////////////////////////////////////////////////////
app.get('/update-contact/:id',async(req,res)=>{
   const contact=await Contact.findById(req.params.id) 
   res.render('update-contact',{contact})
})// open update form
////////////////////////////////////////////////////////////////////////////////////////


app.post('/update-contact/:id',async(req,res)=>{
     await Contact.findByIdAndUpdate(req.params.id,req.body)
     res.redirect("/")
    //res.send(req.body)
})//save update data`
/////////////////////////////////////////////////////////////////////////////////////
app.get('/delete-contact/:id',async(req,res)=>{
     await Contact.findByIdAndDelete(req.params.id)
     res.redirect("/")
})// delete data
///////////////////////////////////////////////////////////////////

app.listen(port,()=>{
    console.log(`server started successfully on port ${port}`)
})