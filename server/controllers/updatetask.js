//const tasks=require('../models/Tasks');
const del=require('../redis/del');
const {Client}=require('@elastic/elasticsearch');
const Bull=require('bull');
const model=require('../models/index')

const client=new Client({
    node:'http://localhost:9200'
});

const updateJob=new Bull('updateJob','redis://127.0.0.1:6379');

updateJob.process(async (job,done)=>{
    try {
        console.log(job.data.data);
        await client.update({index:`tasks`,id:`${job.data.id}`,body:{doc:job.data.data}});
        await client.indices.refresh({index:`tasks`})
        done();
    } catch (error) {
        done(error);
    }
})

module.exports.UpdateTask=async(request,reply)=>{
    try {
        //console.log(request.payload.edit);
        
        await model.task.update({task:request.payload.edit.val,score:request.payload.edit.star},{where:{id:request.payload.edit.id}});
        const r=await model.task.findOne({where:{id:request.payload.edit.id}});
        const results=JSON.parse(JSON.stringify(r));
        console.log(results);
        updateJob.add({data:results,id:request.payload.edit.id},{removeOnComplete:true}).then(()=>console.log('task added to update queue'));
        await del.Del(`user_${request.auth.credentials.uid}`);
        reply(['updated',results]);
    } catch (error) {
        console.log(error);
        reply('error')
    }
}