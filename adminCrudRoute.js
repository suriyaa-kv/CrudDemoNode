var express = require('express')
var router = express.Router()

var adminCrudController=require('../controller/adminCrudController')

router.post('/addUser',adminCrudController.addUser)

router.get('/getAllUser',adminCrudController.getAllUser)

router.put('/alterUser',adminCrudController.alterUser)

//router.delete('/deleteUser/:RollNo',adminCrudController.deleteUser)
module.exports=router