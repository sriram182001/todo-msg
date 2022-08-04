//const tasks=require('../models/Tasks');
const del=require('../redis/del');
const model=require('../models/index')


const {Client}=require('@elastic/elasticsearch');
const Bull=require('bull');

const client=new Client({
    node:'http://localhost:9200'
});

const DQ=new Bull('del-queue','redis://127.0.0.1:6379');
DQ.process(async(job,done)=>{
    try {
        await client.deleteByQuery({
            index:'tasks',
            type:'_doc',
            body: {
                query: {
                    match: { id: `${job.data.data}` }
                }
             }
        },(err,resp)=>{
            console.log(resp);
        });
        await client.indices.refresh({ index: 'tasks' });
        done();
    } catch (err) {
        done(err);
    }
});
module.exports.DeleteTask=async(request,reply)=>{
    try {
        await DQ.add({data:request.payload.id},/* {removeOnComplete:true} */);
        await model.task.destroy({where:{id:request.payload.id}});
        await del.Del(`user_${request.auth.credentials.uid}`);
        reply('deleted');

    } catch (error) {
        
        console.log(error);
        reply('error').code(500)
    }
}