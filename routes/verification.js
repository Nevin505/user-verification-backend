const express=require('express');

const router=express.Router();

const  userController=require('../controllers/bankVerification')

const gstinVerficationController=require('../controllers/gstVerfication')

const addressVerficationController=require('../controllers/addressLookup')

const panCardVerficationController=require('../controllers/panCard')

const aadhaarVerficationController=require('../controllers/aadhaar')





router.post('/validate-gstin',gstinVerficationController.gstVerification)

router.get('/validate-address/:pincode',addressVerficationController.verifyAddress)

router.post('/bank-Account',userController.postBankAccount)

router.post('/panCard',panCardVerficationController.verifyPanCard)

router.post('/aadhaar',aadhaarVerficationController.verifyaadhaar)




module.exports=router;