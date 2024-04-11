const express=require('express');
const app=express();
const port=5000;
const taskRoute=require('./routes/task');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');

const cors=require('cors');
app.use(cors({
    origin:'*'
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

dotenv.config(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`Database connected successfully`);
})
.catch((err)=>{
    console.log(err);
})

app.use('/api/tasks',taskRoute);

app.listen(process.env.PORT || port,()=>{
    console.log(`Server Running at port ${port}`);
})