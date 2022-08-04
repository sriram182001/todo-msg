const {Client}=require('@elastic/elasticsearch');
const Bull=require('bull');
const del=require('../redis/del');
const getter=require('../redis/getter')

const client=new Client({
    node:'http://localhost:9200'
});

const DAQ=new Bull('delacc-queue','redis://127.0.0.1:6379');
DAQ.process(async(job,done)=>{
    try {
        await client.deleteByQuery({
            index:'tasks',
            type:'_doc',
            body: {
                query: {
                    match: { userinfoUid: `${job.data.data}` }
                }
             }
        },(err,resp)=>{
            console.log(resp);
        });
        await client.indices.refresh({ index: 'tasks' });
        done(null,'ok');
    } catch (err) {
        done(err);
    }
});

module.exports.DelAcc=async(request,reply)=>{
    //console.log(request.payload)
    try {
        //console.log(request.payload)
        await DAQ.add({data:request.payload.uid},/* {removeOnComplete:true} */);
        
        const val=await getter.Getter(`user_${request.payload.uid}`);
        if(val!=null)
        {
            await del.Del(`user_${request.payload.uid}`);
        }
        if(request.auth.credentials){
            if(request.auth.credentials.uid===request.payload.uid){
                request.cookieAuth.clear();
            }
        }
        reply('deleted').code(200);

    } catch (error) {
        
        console.log(error);
        reply('error').code(500)
    }
}