const express=require('express');
const { addTasks,getTasks } = require('../controllers/taskControllers');
const router=express.Router();

router.post('/',addTasks);
router.get('/',getTasks);

module.exports=router;