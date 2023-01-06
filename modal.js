const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    phoneNumber:{
        require:true,
        type:Number
    },
    age:{
        require:true,
        type:Number
    },
    pinCode:{
        require:true,
        type:Number
    },
    aadharNo:{
        require:true,
        type:Number
    },
    password:{
        require:true,
        type:Number
    }
})

module.exports = mongoose.model('Data',dataSchema);