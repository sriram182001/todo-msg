//const Connection=require('../dbconfig/dbconnect')
//const userInfo=require('../models/userinfo')
//const session=require('../models/session')
const bcrypt=require('bcrypt')
const model=require('../models/index')

module.exports.LogIn=async(request,reply)=>{
    try
    {
    //const dbConnection=await Connection.connect;
    //const [results,metadata]= await dbConnection.query(`select * from userinfo where uid='${request.payload.state.uid}';`);
    //console.log(results);
    const results= await model.user.findAll({where:{uid:request.payload.state.uid}})
    if(results.length===0)
    {
        reply('invalid user');
    }
    else{
        const hash = results[0].passcode;
        bcrypt.compare(request.payload.state.passcode, hash, async function(err, result) {
        if(result)
        {
            var time = new Date(); 
            //await dbConnection.query(`insert into session(uid,initial,latest) values('${results[0].uid}',now(),now());`);
            const r=await model.session.create({userinfoUid:results[0].uid,initial:time,latest:time,loggedin:true});
            const result=JSON.parse(JSON.stringify(r));
            console.log(result.id,result.userinfoUid);
            request.cookieAuth.set({id:result.id,uid:results[0].uid});
            reply('ok');
            

        }
        else{
            reply('wrong password')
        }
        if(err){
            
            console.log(err)
        }
    });
    }
    }
    catch(err){
        console.log(err);
    }

}
