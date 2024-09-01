const axios = require('axios');
const UserModel=require('../Models/User')

// Function to verify Aadhaar number
exports.verifyaadhaar=async(req,res,next)=>{
   // Destructuring userId and aadhaar from the request body 
    const {userId,aadhaar}=req.body
     // Setting up the options for the Third  API request
    const options = {
        method: 'POST',
        url: process.env.AADHAAR_API,
        headers: {
          'apy-token': process.env.AADHAAR_API_TOKEN,
          'Content-Type': 'application/json'
        },
        data: {aadhaar: aadhaar}
      };
       try{
        const response= await axios.request(options);
         // If the response contains data indicating Aadhaar verification is successful
        if(response.data.data){
           const user=await UserModel.findByIdAndUpdate(userId,{addhaarId:aadhaar,isAadhaarVerified:true});
            // If no user is found with the given userId, return a 404 response
           if(!user){
               return  res.status(404).json({message:"User Not Found"})
           }
             // If Aadhaar is successfully verified and user is updated, return a success response
           return res.status(200).json({message:"Addhaar Verified"})
        }
        else{
            // If the Aadhaar ID is invalid, return a 404 response
           return res.status(404).json({message:"Invalid Aadhaar Id"})
        }
       }
       catch(error){
         // If any error occurs during the process, log the error and return a 500 response
        return res.status(500).json({message:"Something Went Wrong"})
       }
}