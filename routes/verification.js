const express=require('express');

const router=express.Router();

const  userController=require('../controllers/bankVerification')

const gstinVerficationController=require('../controllers/gstVerfication')

const addressVerficationController=require('../controllers/addressLookup')

const panCardVerficationController=require('../controllers/panCard')

const aadhaarVerficationController=require('../controllers/aadhaar')





router.patch('/validate-gstin',gstinVerficationController.gstVerification)

router.get('/validate-address/:pincode',addressVerficationController.verifyAddress)

router.patch('/bank-Account',userController.postBankAccount)

router.patch('/panCard',panCardVerficationController.verifyPanCard)

router.patch('/aadhaar',aadhaarVerficationController.verifyaadhaar)




module.exports=router;