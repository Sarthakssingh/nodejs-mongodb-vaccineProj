const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Model = require('./modal');


//Show client side page

//Homepage
router.get('/',(req,res) =>{
    res.render("page")
})

//login apge
router.get('/login',(req,res)=>{
    res.render('login')
})

//signup page
router.get('/signup',(req,res)=>{
    res.render('signup')
})


/////////////////////////////////////////////////////////////////
//user signup -- 
router.post('/signup',async(req,res)=>{
    const{name,phoneNumber,age,pinCode,aadharNo,password}=req.body;
    if(!name && !phoneNumber&& !age && !pinCode && !aadharNo && !password){
        return res.status(StstusCodes.BAD_REQUEST).json({message:"All Fields Mandatory"});
    }
    const data = {
        name,phoneNumber,age,pinCode,aadharNo,password
    };
    const user = await Model.create(data);
    res.status(200).json()
});


router.get('/admin',(req,res)=>{
    res.render('admin')
})

//////////////////////////////////////////////////////

//signup method--users--postman
// router.post('/signup', async(req,res) => {
//     const data = new Model({
//         name:req.body.name,
//         phoneNumber:req.body.phoneNumber,
//         age:req.body.age,
//         pinCode:req.body.pinCode,
//         aadharNo:req.body.aadharNo
//     })
//     try{
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }catch(error){
//         res.status(500).json({message:error.message})
//     }
// });

//login method
// router.post('/login',async (req,res) =>{
//     const data = await Model.findOne({phoneNumber: req.body.phoneNumber,
//     password:req.body.password})
// })

////////////////////////////////////////////////

//login method--user
router.post('/login',async(req,res)=>{
    try{
        if(!req.body.phoneNumber|| !req.body.password){
            res.status(StatusCodes.BAD_REQUEST).json({message:"Enter phone and password"});
        }
        const data = await Model.findOne({phoneNumber:req.body.phoneNumber,password:req.body.password});
        if(data){
            if(data.password===req.body.password){
                res.send("success");
            }else{
                res.send({"Success":"wrong password"})
            }
        }else{
            res.send({"Success":"not registred"})
        }

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//getAllusers method--admin
router.get('/getData',async (req,res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

///////////////////////////////////////////////////////////

//get by filter--admin
router.get('/getbyName',async(req,res) => {
    try {
        const data = await Model.find();
        const filters = req.query;
        const filtered = data.filter(user => {
            let isValid = true;
            for(key in filters){
                console.log(key, user[key],filters[key]);
                isValid = isValid && user[key] == filters[key];
            }
            return isValid;
        });
        res.json(filtered)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
//get vacine status
router.get('/vaccine',(req,res) =>{
    try{
    let times = new Date();
    let hours = times.getHours();
    if(hours>10 && hours<17){
        res.send("Book vaccineSlot available : 10")
    }else{
        res.send("Come tomorrow")
    }
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
});


module.exports = router;