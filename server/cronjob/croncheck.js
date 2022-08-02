const Bull=require('bull');
//const userInfo=require('../models/userinfo')
//const sessionM=require('../models/session')
const {Op}=require('sequelize');
const Axios = require('axios');
const model=require('../models/index');
const worker = require('../worker/worker');

const CJob=new Bull('Cron-Job','redis://127.0.0.1:6379');
//const WJob=new Bull('Worker-Job','redis://127.0.0.1:6379');

CJob.add({},{repeat:{cron:'*/10 * * * * *'}}).then(()=>{console.log('cron is running')});

CJob.process(async (job,done)=>{
   const r=await model.session.findAll({where:{latest:{[Op.lte]:new Date(new Date()-259200000)}}});
   const results=await JSON.parse(JSON.stringify(r));
   console.log(results)
   if(results.length!==0)
   {
   for(let i=0;i<results.length;i++)
   {
    console.log('at cron:',results[i])
    //WJob.add({user:results[i]},{removeOnComplete: true}).then(()=>{console.log("added to worker")});
    worker(results[i]);
   }
   }
   done();

});

/* WJob.process(async(job,done)=>{
    try {
        console.log('workerJob')
        console.log(job.data.user)
        console.log(job.data.user.userinfoUid)
        const res=await Axios.post('http://localhost:3000/api/delacc',{uid:job.data.user.userinfoUid});
        //console.log(res)
        await model.user.destroy({where:{uid:job.data.user.userinfoUid}});
        
        done();
    } catch (error) {
        done(error)
        console.log(error)
    }
   
}) */