const axios = require('axios');

// Function to verify an address using a pincode
exports.verifyAddress = async (req, res, next) => {
    const pincode = req.params.pincode;
console.log(pincode)

    // Validate if pincode is present
    if (!pincode || pincode.length!=6) {
        return res.status(400).json({ message: "Pincode is Not Valid" });
    }
        // Validate if pincode contains only numeric digits
    if (!/^\d+$/.test(pincode)) {
        return res.status(400).json({ message: "Pincode must contain only numeric digits" });
    }
   // Setting up the options for the Third Party API request
    const options = {
        method: 'GET',
        url: `${process.env.ADDRESS_LOOKUP_URL}/${pincode}`,
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
        },
    };

    try {
        const response = await axios.request(options);

        // Check if the response data array is empty
        if (response.data.length === 0) {
            return res.status(404).json({ message: "No cities found with that particular code" });
        }

        // Fetch the first item from the array
        return res.json(response.data[0]);
    } catch (error) {
           // Return an error response with the status code from the error or default to 500
        return res.status(error.status|500).json({ error: "An error occurred while verifying the address" });
    }
};
