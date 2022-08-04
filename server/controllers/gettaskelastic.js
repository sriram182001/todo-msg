const {Client}=require('@elastic/elasticsearch');
const Bull=require('bull');

const client=new Client({
    node:'http://localhost:9200'
});

const EQ=new Bull('elastic-queue','redis://127.0.0.1:6379');


EQ.process(async (job,done)=>{
    try {
        console.log(job.data.data);
        await client.indices.refresh({ index: 'tasks' })
        const result= await client.search({
            index: 'tasks',
            sort:[{'score':'desc'}],
            query: {
              bool:{
                must:{
                    query_string : { query :`*${job.data.data}*`,default_field:"task" }
                },
                filter:{
                    term:{'userinfoUid':`${job.data.uid}`}
                }
                    
              }
            }
          })
          //console.log(result.hits.hits);
          
        done(null,result.hits.hits);
        //Promise.resolve(result)
    } catch (error) {
        done(error);
        //Promise.reject(error)
    }
});

/* EQ.on('completed',(job,result)=>{
    console.log(result);
    job.remove();
    
}); */

module.exports.GetTaskElastic=async(request,reply)=>{
    try{
    //console.log(request.payload.state.input)
    const job=await EQ.add({data:request.payload.state.input,uid:request.auth.credentials.uid},/* {removeOnComplete:true} */);
    const res=await job.finished()
    res.map(item=>item._source.task=item._source.task.toUpperCase())
    console.log(res)
    reply(res)    
    }
    catch(error){
        console.log(error);
    }
}