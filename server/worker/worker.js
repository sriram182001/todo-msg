const Bull=require('bull');
const Axios = require('axios');
const model=require('../models/index');


const WJob=new Bull('Worker-Job','redis://127.0.0.1:6379');
WJob.process(async(job,done)=>{
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
   
})
module.exports=(data)=>{
    WJob.add({user:data},{removeOnComplete: true}).then(()=>{console.log("added to worker")});
}