const UserModel=require('../Models/User')

const { generateOTP } = require('../lib/generateNumber');


const nodemailer=require('nodemailer');


const jwt = require('jsonwebtoken');


exports.generateEmailOtp= (req, res, next) => {

    const userEmail = req.body.email;
     
    if (!userEmail) {
        return res.status(400).json({message:'Email is required'});

    }
    const otp = generateOTP(); // Generate OTP
    if (req.session.otp) {
        delete req.session.otp; // Remove the old OTP from the session
    }
// To Set the Otp on the Session
     req.session.otp=otp;
     
    // Create a transport object for sending email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Send OTP Email function
    function sendOTPEmail(userEmail, otp) {
        const mailOptions = {
            from: '"Verfication App',
            to: userEmail,
            subject: 'Your OTP Code',
            html: `<p>Your OTP code is: <strong>${otp}</strong></p>
                   <p>This code is valid for the next 10 minutes.</p>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).send('Failed to send OTP');
            } else {
                res.status(200).json({message:'OTP sent successfully'});
            }
        });
    }

    // Call the sendOTPEmail function
    sendOTPEmail(userEmail, otp);
};

exports.verfiyEmail=(req,res,next)=>{
    console.log(req.body.email)
    console.log(req.body.otp)
    const sessionOtp = req.session.otp;
    console.log(sessionOtp)
    const{email,otp}=req.body;
    if(otp===sessionOtp){
        res.status(200).json({message:"Verifcation Succesfful"})
    }
    else{
        res.status(400).json({message:"Verifcation UnSuccesfful"})

    }
}




