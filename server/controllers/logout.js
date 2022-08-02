const { now } = require('moment');
const Connection=require('../dbconfig/dbconnect')
//const session=require('../models/session')
const del=require('../redis/del')
const model=require('../models/index')

module.exports.LogOut=async(request,reply)=>{
    try{
    //const dbConnection=await Connection.connect;
    console.log(request.auth.credentials);
    //"await dbConnection.query(`delete from session where id=${session.id};`);"
    //await dbConnection.query(`update session set loggedin=false,latest=now() where id=${request.auth.credentials.id};`);
    var time = new Date(); 
    /*var time = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()+"."
                +currentdate.getMilliseconds();
    */
    await model.session.update({loggedin:false,latest:time},{where:{id:request.auth.credentials.id}})
    request.cookieAuth.clear();
    //del.Del(`user_${request.auth.credentials.uid}`);
    reply('loggedout');
    }
    catch(err){
      console.log(err)
    }
}