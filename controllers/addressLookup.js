const axios = require('axios');


 exports.verifyAddress=async(req,res,next)=>{

    const pincode=req.params.pincode;
    console.log(pincode)

    const options={
        method:'GET',
        url:`${process.env.ADDRESS_LOOKUP_URL}/${pincode}`,
        headers:{
            'x-rapidapi-key':process.env.X_RAPIDAPI_KEY,
            'x-rapidapi-host':process.env.X_RAPIDAPI_HOST
        }
    }

    try {
        
        const response = await axios.request(options);
        console.log(response.data[0]);
        return res.json(response.data[0])
    } catch (error) {
        console.error(error);
    }   
}
