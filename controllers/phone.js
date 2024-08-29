const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const mongoose=require('mongoose')

const UserModel=require('../Models/User');
const { generateOTP } = require('../lib/generateNumber');


exports.sendPhoneOtp=(req,res,next)=>{
//   const phoneNumber=req.body.phoneNumber
  const {userId,phoneNumber}=req.body;

  console.log(userId,phoneNumber)

const phoneOtp = generateOTP(); 

console.log(phoneOtp)

// if(req.session.phoneOtp) {
//             delete req.session.phoneOtp; // Remove the old OTP from the session
//         }
        req.session.phoneOtp=phoneOtp;
        
        console.log(req.session)

// client.messages
//   .create({
//     body: `${otp}`,
//     messagingServiceSid: 'MG9da8bfcf0b3c2ae8293151c5b9a454ab',
//     to: `+91${phoneNumber}`
//   })
//   .then(message => 
//    { if (req.session.phoneOtp) {
//         delete req.session.phoneOtp; // Remove the old OTP from the session
//     }
//     req.session.phoneOtp=phoneOtp;
//     console.log(message.sid)
// });
}

exports.verifyPhoneOtp=async(req,res,next)=>{
  const {userId,OtpNumber,phoneNumber}=req.body;
   console.log(phoneNumber)

//   console.log(response)
    console.log(req.session)
    const sessionOtp = req.session.phoneOtp;
    console.log(sessionOtp)
    // const{email,otp}=req.body;
    if(OtpNumber===sessionOtp){
        const response=await UserModel.findByIdAndUpdate(userId,{phoneNumber});
        console.log(response)

        res.status(200).json({message:"Verifcation Succesfful"})
    }
    else{
        res.status(400).json({message:"Verifcation UnSuccesfful"})

    }
}