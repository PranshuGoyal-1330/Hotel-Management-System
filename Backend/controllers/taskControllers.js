const Task=require('../models/Task');

const addTasks=async(req,res)=>{
    const newTask=new Task({
        id:req.body.id,
        name:req.body.name,
        roomNumber:req.body.roomNumber,
        instructions:req.body.instructions,
        dateTime:req.body.dateTime,
        taskType:req.body.taskType,
        task:req.body.task
    })
    console.log(req.body);

    try{
        const savedTask=await newTask.save();
        res.status(200).json(savedTask);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const getTasks=async(req,res)=>{

    const qStatus=req.query.status;
    console.log(qStatus);
    try{
        let tasks;

        if(qStatus){
            tasks=await Task.find({
                status:{
                    $in:[qStatus]
                }
            })
        }
        else{
            tasks=await Task.find({});
        }
        res.status(200).json(tasks);

    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports={
    addTasks,
    getTasks
}