const axios = require('axios');
const UserModel=require('../Models/User')


exports.postBankAccount=async(req,res,next)=>{

  let requestId;

    const {bankAccountNumber,bankIfscCode,userId}=req.body
    
     // Basic validation
     if (!bankAccountNumber || !bankIfscCode || !userId) {
      return res.status(400).json({ message: "Missing required fields: bankAccountNumber, bankIfscCode, or userId." });
  }
// For The  Post Request to get the the request Id From the third Party Api
const options = {
  method: 'POST',
  url: 'https://indian-bank-account-verification.p.rapidapi.com/v3/tasks/async/verify_with_source/validate_bank_account',
  headers: {
    'x-rapidapi-key': '422fa2560dmsh37d11458db432f0p14212cjsn926a7001fd97',
    'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com',
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

try {
	const response = await axios.request(options);
  requestId=response.data. request_id
	console.log(response.data);
  console.log(requestId)
} catch (error) {
	console.error(error);
}

console.log(requestId)
const options2 = {
  method: 'GET',
  url: 'https://indian-bank-account-verification.p.rapidapi.com/v3/tasks',
  params: {
    request_id: requestId
  },
  headers: {
    'x-rapidapi-key': '422fa2560dmsh37d11458db432f0p14212cjsn926a7001fd97',
    'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options2);
  console.log(response.data[0]);
  if(response.data[0].status==='completed'){
    const user=await UserModel.findByIdAndUpdate(userId,{accountNumber:bankAccountNumber,isBankAccountVerified:true});
    // If no user is found with the given userId, return a 404 response
   if(!user){
       return  res.status(404).json({message:"User Not Found"})
   }
     // If Bank is successfully verified and user is updated, return a success response
   return res.status(200).json({message:"Bank Account Verified"})
  }
  else if(response.data[0].status==='in_progress'){
    return res.status(200).json({message:"in_progress"})
  }
} catch (error) {
	console.error(error);
  return res.status(500).json({message:"Something Went Wrong"})
}

}



