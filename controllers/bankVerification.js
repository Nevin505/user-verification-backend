const axios = require('axios');

exports.postBankAccount=async(req,res,next)=>{

    const {bankAccountNumber,bankIfscCode}=req.body


    const options = {
        method: 'POST',
        url: process.env.X_RAPIDAPI_BANKACCOUNT_URL,
        headers: {
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY_BANK,
          'x-rapidapi-host': process.env.X_RAPIDAPI_HOST_BANK,
          'Content-Type': 'application/json'
        },
        data: {
          task_id: '123',
          group_id: '1234',
          data: {
            bank_account_no: bankAccountNumber,
            bank_ifsc_code: bankIfscCode
          }
        }
      };

    //   res.json({options})
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
           if(response.data.request_id){

            const verifyBankoptions = {
                method: 'GET',
                url: process.env.X_RAPIDAPI_BANKACCOUNT_URL_VERIFY,
                params: {
                  request_id: response.data.request_id
                },
                headers: {
                  'x-rapidapi-key': process.env.X_RAPIDAPI_KEY_BANK_VERIFY,
                  'x-rapidapi-host': process.env.X_RAPIDAPI_HOST_BANK
                }
              };
              
            //   try {
                  const response2 = await axios.request(verifyBankoptions);
                  console.log(response2.data);
                  return res.json(response2.data)
            //   } catch (error) {
            //     console.log("Bank Account Error Verify");
                
            //       console.error(error);
            //       res.json(error)
            //   }
           }
        //   res.json(response.data)
      } catch (error) {
        console.log("Bank Account Error");

          console.error(error);
          res.json(error)
      }
}



