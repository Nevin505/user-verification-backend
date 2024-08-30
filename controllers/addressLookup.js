const axios = require('axios');

exports.verifyAddress = async (req, res, next) => {
    const pincode = req.params.pincode;

    // Validate if pincode is present
    if (!pincode) {
        return res.status(400).json({ message: "Pincode is required" });
    }

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
        console.error(error);
        return res.status(500).json({ error: "An error occurred while verifying the address" });
    }
};
