const express=require('express');

const router=express.Router();

const  userController=require('../controllers/user')


router.post('/',userController.authenticateUser)

router.get('/user-details/:userId',userController.fetchUserDetails)


module.exports=router;