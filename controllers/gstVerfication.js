const axios = require('axios');
const UserModel=require('../Models/User')


// GSTIN validations
exports.gstVerification = async (req, res, next) => {
    const { gstinNumber ,userId} = req.body;
    console.log({gstinNumber ,userId})

    // Check if gstinNumber is provided
    if (!gstinNumber) {
        return res.status(400).json({ message: 'GST number is required' });
    }
    const options = {
        method: 'POST',
        url: process.env.X_RAPIDAPI_GST_URL,
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY_GST,
            'x-rapidapi-host': process.env.X_RAPIDAPI_HOST_GST,
            'Content-Type': 'application/json'
        },
        data: {
            task_id: process.env.TASK_ID_GST,
            group_id: process.env.GROUP_ID_GST,
            data: {
                gstin: gstinNumber
            }
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data)
        if(response.data.result && response.data.result.source_output && response.data.result.source_output.gstin){
                    // return res.json(response.data)
            try {
                // Attempt to update the user with the verified GST number
                await UserModel.findByIdAndUpdate( {_id:userId}, { gstNumber: gstinNumber, isGstVerifed: true });
                return res.json({ message: 'GST number verified and updated successfully' });
            } catch (dbError) {
                // Throw an error if the database operation fails
                throw new Error(`Failed to update GST information in the database: ${dbError.message}`);
            }
        }
        else{
            return res.status(400).json({ message: 'GSTIN not found. Please verify the entered number and try again.'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to verify GST number', error });
    }
};
