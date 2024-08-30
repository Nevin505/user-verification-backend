const express=require('express');


const router=express.Router();

const userController=require('../controllers/user');

const emailVerficationController=require('../controllers/email');

const phoneVerficationController=require('../controllers/phone');





router.post('/request-email-otp',emailVerficationController.generateEmailOtp)

router.post('/validate-email-otp',emailVerficationController.verfiyEmail)

router.post('/saveUser',userController.saveUser)

router.post('/request-phone-otp',phoneVerficationController.sendPhoneOtp)

router.post('/validate-phone-otp',phoneVerficationController.verifyPhoneOtp)




module.exports=router;