const router = require('express').Router()
const todoController = require('../controller/todoController')


router.get('/',todoController.fetchAllTask)
router.post('/newTask',todoController.NewTask)
router.delete('/removeTask',todoController.removeTask)
router.put('/updateTask',todoController.updateTask)
router.post('/done',todoController.done)


module.exports = router