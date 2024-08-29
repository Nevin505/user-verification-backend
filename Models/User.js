const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phoneNumber:{
        type:String,
        defaults:null
    },
    isMailVerfied:{
        type:Boolean,
        default:false
    },
    isPhoneVerfied:{
        type:Boolean,
        default:false
    },
    phoneNumber:{
        type:String,
        unique:true,
    },
    addhaarId:{
        type:String,
        default:null
    },
    panCard:{
        type:String,
        default:null
    },
    accountNumber:{
        type:String,
        default:null
    },
    password:{
        type:String,
        // required:true
    },
    isMailVerfied:{
        type:Boolean
    },
    isPhoneNumberVerified:{
        type:Boolean
    },
    isPanVerified:{
        type:Boolean
    },
    isBankAccountVerified:{
        type:Boolean
    },
    isAccountVerified:{
        type:Boolean
    }
})

module.exports=mongoose.model("userSchema",userSchema);