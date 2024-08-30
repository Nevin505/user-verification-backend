const axios = require('axios');
const UserModel=require('../Models/User')


exports.verifyaadhaar=async(req,res,next)=>{
    const {userId,aadhaar}=req.body
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
        if(response.data.data){
           const user=await UserModel.findByIdAndUpdate(userId,{addhaarId:aadhaar,isAadhaarVerified:true});
           if(!user){
               return  res.status(404).json({message:"User Not Foung"})
           }
           return res.status(200).json({message:"Addhaar Verified"})
        }
        else{
           return res.status(404).json({message:"Invalid Aadhaar Id"})
        }
       }
       catch(error){
        return res.status(500).json({message:"Something Went Wrong"})
       }
}