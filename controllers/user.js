const UserModel=require('../Models/User');


exports.saveUser=async(req,res,next)=>{
    console.log("Heree")
    const {email,userName,password,dateOfBirth}=req.body;

    console.log(dateOfBirth);

    try{
        const user=new UserModel({email,userName,isMailVerfied:true,password,dateOfBirth});
   const response= await user.save();
   res.status(200).json({message:"User Creation Successfull",id:response._id})
    }
    catch(error){
        // Handling Errors Related to Duplicate Email Id
        if (error.code === 11000) {
            res.status(400).json({ message: "Email already exists. Please use a different email."});
          } else {
            // Handle other errors
            res.status(500).json({ message: "An error occurred while creating the user." });
          }
    }
}

// To Authenticate User
exports.authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find the user with the given email and password
    const user = await UserModel.findOne({ email: email, password: password });

    // If user not found, return a 404 status with a message
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    // If user is found, return the user data
    res.status(200).json({email:user.email,id:user._id,userName:user.userName});
  } catch (error) {
    console.error("Error during authentication:", error);
    // For all other errors, return a generic 500 status
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

exports.fetchUserDetails=async(req,res,next)=>{
  const userId=req.params.userId
  if(!userId){
    return res.status(404).json({message:'Enter a User Id'})
  }
   try{
    const response=await UserModel.findById(userId);
    if(response){
      return res.json(response)
    }
    return res.status(404).json({ message: "User with the provided ID not found" })
   }
   catch(error){
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." })
     
   }
}
