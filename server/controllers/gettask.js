//const tasks=require('../models/Tasks');
//const userinfo=require('../models/userinfo');
const getter=require('../redis/getter')
const setter=require('../redis/setter')
const {Client}=require('@elastic/elasticsearch');
const model=require('../models/index')


const client=new Client({
    node:'http://localhost:9200'
});

module.exports.GetTask=async(request,reply)=>{
    
    try {
        
        const val=await getter.Getter(`user_${request.auth.credentials.uid}`);
        if(val!=null){
        console.log('from redis')
        reply(JSON.parse(val));
        }
        else{
        //const r=await tasks.TasksTable.findAll({attributes:['task','id','score'],where:{uid:request.auth.credentials.uid}});
        //const rstr=JSON.stringify(r);
        const rstr=JSON.parse(JSON.stringify((await model.task.findAll({attributes:['task','id','score'],where:{userinfoUid:request.auth.credentials.uid}}))));
        //const t=await model.user.findOne({where:{uid:request.auth.credentials.uid}});
        console.log(rstr);
        console.log('from db');
        if(rstr.length>0)
        {
            await setter.Set(`user_${request.auth.credentials.uid}`,3600,JSON.stringify(rstr));
        }
        
        reply(rstr);
        } 
                
        
        //const results=JSON.parse(rstr);
        //console.log(results);
        //reply(results);
    } catch (error) {
        console.log(error);
        reply('error').code(500);
    }
}