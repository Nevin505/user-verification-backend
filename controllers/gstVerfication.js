const axios = require('axios');

exports.gstVerfication=async(req,res,next)=>{

    const{gstinNumber}=req.body

     const options={
        method: 'POST',
        url:process.env.X_RAPIDAPI_GST_URL,
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY_GST,
            'x-rapidapi-host': process.env.X_RAPIDAPI_HOST_GST,
            'Content-Type': 'application/json'
        },
        data: {
            task_id: process.env.TASK_ID_GST ,
            group_id:  process.env.GROUP_ID_GST,
            data: {
              gstin: `${gstinNumber}`
            }
          }
     }

    try {
	const response = await axios.request(options);
    res.json(response.data)
	// console.log();
} catch (error) {
	console.error(error);
}
}
