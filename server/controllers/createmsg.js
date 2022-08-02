
//const msg=require('../models/msg')
const model=require('../models/index')

module.exports.CreateMsg=async(request,reply)=>{
    try{
    var time=new Date();
    time.setMinutes(time.getMinutes()+parseInt(request.payload.state.ttl))
    console.log(time.getHours())
    const r=await model.msg.create({msg:request.payload.state.msg,endat:time,userinfoUid:request.auth.credentials.uid,cat:request.payload.state.cat});
    const res=JSON.parse(JSON.stringify(r))
    reply(res).code(200)
    }
    catch(err){
        console.log(err);
        reply('not ok').code(500)
    }
}