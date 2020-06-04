const {todoModel} = require('../db/model/TodoModel')
const moment = require('moment')


let d = new Date()
let date = d.getFullYear() + '/0' + (d.getMonth()+1) + '/' + d.getDate()
let time = d.getHours() +':'+ d.getMinutes() +':'+ d.getSeconds()



const todoController = {

    fetchAllTask:async(req,res)=>{
        try {
            // console.log(req.user);
            let allTasks = await todoModel.find({})
            let count = await todoModel.countDocuments({})
            await res.render('../views/TodoList.pug',{allTasks,count,moment})
        } catch (err) {
            console.error(err);
        }
    },
    NewTask : async(req,res)=>{
        try {
            const body = req.body

            const newTask = new todoModel({
                todo : body.todo,
                isDone : false,
                time,
                date,
            })
            await newTask.save()
            res.status(200).send('your data saved now')
            
        } catch (err) {
            console.error(err);            
        }
    },
    removeTask : async(req,res)=>{
        try {
            let todo = Object.keys(req.body)[0]
            await todoModel.findOneAndDelete({todo})
            res.end() 
        } catch (err) {
            console.error(err);
        }
    },
    updateTask : async(req,res)=>{
        try {
            let task = req.body.todo
            let oldTask = req.body.oldTask

           
            await todoModel.findOneAndUpdate({
                todo : oldTask
            },{
                $set:{todo:task}
            })


            await res.end()
        } catch (err) {
            console.error(err);
        }
    },
    done : async(req,res)=>{
        try {
            await todoModel.findOneAndUpdate({
                _id : req.body._id
            },{
                $set:{isDone:req.body.isChecked}
            })
            await res.end()
        } catch (err) {
            console.error(err);
        }
    },
    enabledTasks:async(req,res)=>{
        try {
            let allTasks = await todoModel.find({isDone:false})
            let count = allTasks.length
            await res.status(200).render("../views/todoList.pug",{allTasks,count,moment})
        } catch (err) {
            console.log(err);
        }
    },
    disabledTasks:async(req,res)=>{
        try {
            let allTasks = await todoModel.find({isDone:true})
            let count = allTasks.length
            await res.status(200).render("../views/todoList.pug",{allTasks,count,moment})
        } catch (err) {
            console.log(err);
        }
    },
}

module.exports = todoController