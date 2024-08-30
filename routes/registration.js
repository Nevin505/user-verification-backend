const express=require('express');


const router=express.Router();

const userController=require('../controllers/user');

const emailVerficationController=require('../controllers/email');

const phoneVerficationController=require('../controllers/phone');


const addressVerficationController=require('../controllers/addressLookup')



router.post('/request-email-otp',emailVerficationController.generateEmailOtp)

router.post('/validate-email-otp',emailVerficationController.verfiyEmail)

router.post('/saveUser',userController.saveUser)

router.post('/request-phone-otp',phoneVerficationController.sendPhoneOtp)

router.post('/validate-phone-otp',phoneVerficationController.verifyPhoneOtp)

router.get('/validate-address/:pincode',addressVerficationController.verifyAddress)



module.exports=router;