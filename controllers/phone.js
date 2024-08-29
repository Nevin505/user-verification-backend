const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const UserModel=require('../Models/User');
const { generateOTP } = require('../lib/generateNumber');


exports.sendPhoneOtp=(req,res,next)=>{
  const {userId,phoneNumber}=req.body;

  console.log(userId,phoneNumber)

const phoneOtp = generateOTP(); 

console.log(phoneOtp)
console.log("Phone Otp")

        
        // console.log(req.session)
//    res.status(200).json({message:"otpSent"})
client.messages
  .create({
    body: `${phoneOtp}`,
    messagingServiceSid: 'MG9da8bfcf0b3c2ae8293151c5b9a454ab',
    to: `+91${phoneNumber}`
  })
  .then(message => 
   {
     if (req.session.phoneOtp) {
        delete req.session.phoneOtp; // Remove the old OTP from the session
    }
    req.session.phoneOtp=phoneOtp;
    console.log(req.session)
  res.json({message:"Sent"})
    // console.log(message.sid)
});
}

exports.verifyPhoneOtp=async(req,res,next)=>{
  const {userId,OtpNumber,phoneNumber}=req.body;
   console.log(phoneNumber)
    console.log(req.session)
    const sessionOtp = req.session.phoneOtp;
    console.log(sessionOtp,"otp Session")
    if(OtpNumber===sessionOtp){
        const response=await UserModel.findByIdAndUpdate(userId,{phoneNumber});
        console.log(response)

        res.status(200).json({message:"Verifcation Succesfful"})
    }
    else{
        res.status(400).json({message:"Verifcation UnSuccesfful"})

    }
}