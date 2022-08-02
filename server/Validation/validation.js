const userInfo=require('../models/userinfo')
const sessionM=require('../models/session')
const model=require('../models/index')


module.exports.isvalid=async function isvalid(request, session, callback) {
    try{
    //console.log('from session:',session);
    /* const r=await sessionM.STable.findAll({attributes:['id'],where:{uid:session.uid}})
    const rstr=JSON.stringify(r);
    const results=JSON.parse(rstr); */
    //const results=JSON.parse(JSON.stringify((await sessionM.STable.findAll({where:{id:session.id,loggedin:true}}))));
    const results=JSON.parse(JSON.stringify((await model.session.findAll({include:{model:model.user,as:'userinfo',required:true,where:{uid:session.uid}},where:{loggedin:true}}))));
    console.log(results)
   //console.log(results)
    //const results=JSON.parse(JSON.stringify((await sessionM.STable.findAll({include:'userinfo',order:[['id']]}))));
    //console.log(results)
    //console.log('from db',results[0].id)

    for(let i=0;i<results.length;i++)
    {
        if(session.id===results[i].id)
        {
            //request.session = session.uid;
            //await dbconnection.query(`update session set loggedin=true,latest=now() where id=${results[i].id};`);
        //if(results.id===session.id)
        //{
            var time = new Date();       
            await model.session.update({loggedin:true,latest:time},{where:{id:results[i].id}})
            return callback(null,true,{uid:results[i].userinfoUid,id:results[0].id});
        //}
        }
    }
        return callback(null,false,null)
      
    }
    catch(err){
       console.log(err);
    }
}