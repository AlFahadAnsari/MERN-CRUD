const express = require('express')
const  mongoose  = require('mongoose')
const app = express()
const cors =require('cors')


app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://ansari:alfahad@crudweb.ntqpcyj.mongodb.net/MERN_CRUD')
.then(()=>{
    console.log('mongoDb is connected');
}).catch((er)=>{
    console.log({message :'error is ' +er});
})


// schma create 
let ModelScema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true })
let userData=mongoose.model('userData',ModelScema)


// routers
app.post('/creteuser', async (req,res)=>{
   try {
    let {name,email,password}=req.body
    let creatUser =  new userData({
        name,
        email,
        password,
    })
     await creatUser.save()
    res.send(creatUser)

   } catch(error) {
        console.log({message :"error" + error});
   }
})


// read all user
app.get('/readuser',async (req,res)=>{
  try {
    const allData= await userData.find({})
    res.send(allData)
  } catch (error) {
    console.log({message :"error" + error});
  }
})


app.get('/read/:id', async (req, res) => { 
 try {
  let id = req.params.id
  const UserReadData =await userData.findById({_id :id})
  res.send(UserReadData)
 } catch (error) {
  console.log({message :"error" + error});
 }
})


app.put('/update/:id', async (req,res)=>{
  try {
      let id = req.params.id
      let UpdateData =await userData.findByIdAndUpdate({_id:id},req.body,{
        new:true
      })
      res.send(UpdateData)
  } catch (error) {
    console.log({message :"error" + error});
  }
})



app.delete('/delete/:id',async (req,res)=>{
 try {
  let id = req.params.id
  let DeleteData=await userData.findByIdAndDelete({_id:id})
  res.send(DeleteData)
 } catch (error) {
  console.log({message :"error" + error});
 }
}) 



app.listen(2000,()=>{
  console.log('port run on 2000');
})