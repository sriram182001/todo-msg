//const Connection=require('../dbconfig/dbconnect')
//const userInfo=require('../models/userinfo')
const model=require('../models/index')

module.exports.GetDetails=async(request,reply)=>{
    try{
    const uid=request.auth.credentials.uid;
    console.log(request.auth.credentials)
    //const dbConnection=await Connection.connect;
    //const [results,metadata]=await dbConnection.query(`select * from userinfo where uid='${uid}';`);
    const results=await model.user.findAll({where:{uid:uid}})
    //console.log(results,'im inside getdetails')
    reply(results[0]);
    }
    catch(err)
    {
        console.log(err)
    }
}