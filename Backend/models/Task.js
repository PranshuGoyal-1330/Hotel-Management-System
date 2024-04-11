const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
    id:{type:String,required:true},
    name:{type:String},
    roomNumber:{type:String},
    instructions:{type:String},
    status:{type:Array,default:"Scheduled"},
    dateTime:{type:Object},
    taskType:{type:String},
    task:{type:Array},
    rating:{type:Number},
},{timestamps:true})

module.exports=mongoose.model("Task",TaskSchema);