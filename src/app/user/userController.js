var userService=require('./userService')
var createUserControllerFn=async(req,res)=>
{
try{
    console.log(req.body)
    var status =await userService.createUserDBService(req.body);
    console.log(status)
    if(status){
        res.send({"status":true,"message":"user created successfully"})
    }
    else{
        res.send({"status":false,"message":"error creating user"})

    }
}
catch(err){
    console.log(err)
}
}