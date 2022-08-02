const Connection=require('../dbconfig/dbconnect')
//const userinfo=require('../models/userinfo')
const session=require('../models/session')
const bcrypt=require('bcrypt');
const model=require('../models/index')

module.exports.SignUp=async (request,reply)=>{
    //const dbConnection=await Connection.connect;
    //const [results,metadata]= await dbConnection.query(`select name from userinfo where uid='${request.payload.state.uid}';`);
    //console.log(results);
  
    const results=await model.user.findAll({attributes:['name'],where:{uid:request.payload.state.uid}})
    console.log(results)

    if(results.length>0){
        console.log('in');
        reply('already exists');
    }
    else{
        bcrypt.hash(request.payload.state.passcode, 10, async function(err, hash) {
                // store hash in the database
                //console.log(hash);
                await model.user.create({name:request.payload.state.name,passcode:hash,mailid:request.payload.state.mailid,uid:request.payload.state.uid});
                if(err)
                console.log(err)
        });
            
        reply('added');
        
        
    }
    }