//const tasks=require('../models/Tasks');
const del=require('../redis/del');
const {Client}=require('@elastic/elasticsearch');
const Bull=require('bull');
const model=require('../models/index')

const client=new Client({
    node:'http://localhost:9200'
});
const addJob=new Bull('addJob','redis://127.0.0.1:6379');

addJob.process(async (job,done)=>{
    try {
        console.log(job.data.data);
        await client.index({index:`tasks`,id:`${job.data.data.id}`,document:job.data.data});
        await client.indices.refresh({index:`tasks`})
        done();
    } catch (error) {
        done(error);
    }
})

module.exports.AddTask=async(request,reply)=>{
    try {
        var time = new Date();
        const r=await model.task.create({task:request.payload.state.task,created:time,score:request.payload.rating,userinfoUid:request.auth.credentials.uid});
        const results=JSON.parse(JSON.stringify(r));
        //console.log(results);
        addJob.add({data:results},{removeOnComplete:true}).then(()=>console.log('task added to queue'));
       
        await del.Del(`user_${request.auth.credentials.uid}`);
        reply(['added',results]);
    } catch (error) {
        
        console.log(error);
        reply('error')
    }
}