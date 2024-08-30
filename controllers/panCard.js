const axios = require('axios');
const UserModel=require('../Models/User')


exports.verifyPanCard=async(req,res,next)=>{

    const{userId,panCard}=req.body;
    // return res.json({panCard})

     // Validate if panCard is present
     if (!panCard) {
        return res.status(400).json({ message: "PAN Card number is required" });
    }
    const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panCardPattern.test(panCard)) {
        return res.status(400).json({ message: "Invalid PAN Card format" });
    }
   

    const options = {
        method: 'POST',
        url: process.env.X_RAPIDAPI_PANCARD_URL_VERIFY,
        headers: {
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY_PANCARD,
          'x-rapidapi-host': process.env.X_RAPIDAPI_HOST_PANCARD,
          'Content-Type': 'application/json'
        },
        data: {
            pan: panCard,
            consent: 'y',
            consent_text: 'I hear by declare my consent agreement for fetching my information via AITAN Labs API'
          }
        
      };

      try {
        const response = await axios.request(options);
        if (response.status !== 200) {
            return res.status(response.status).json({ message: "Failed to verify PAN Card", details: response.data });
        }
        if(response.data.success=="success" && response.data.pan){

           const userData= await UserModel.findByIdAndUpdate(userId,{userId:true,panCard,isPanVerified:true})
             console.log(userData);
             if(!userData){
                return res.status(404).json({message:"User Don't Exist"})
             }
            return res.json(response.data);
        }
        else{
            return res.status(404).json({ message: " PAN Card Doesn't Exist"});
        }
    } catch (error) {
        console.error(error);
    }
}


