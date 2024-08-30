const express=require('express');

const router=express.Router();

const  userController=require('../controllers/bankVerification')

const gstinVerficationController=require('../controllers/gstVerfication')


router.post('/validate-gstin',gstinVerficationController.gstVerification)


router.post('/bank-Account',userController.postBankAccount)


module.exports=router;