const express=require('express');

const router=express.Router();

const  userController=require('../controllers/bankVerification')

const gstinVerficationController=require('../controllers/gstVerfication')

const addressVerficationController=require('../controllers/addressLookup')



router.post('/validate-gstin',gstinVerficationController.gstVerification)

router.get('/validate-address/:pincode',addressVerficationController.verifyAddress)

router.post('/bank-Account',userController.postBankAccount)


module.exports=router;