const Bull=require('bull');
const Arena=require('bull-arena-extended');

const jobs=['Cron-Job','Worker-Job',"addJob","delacc-queue","del-queue","elastic-queue","updateJob"];
Arena({
    Bull,
    queues:jobs.map(job=>{
        return {
            type: 'bull',
            name: job,
            hostId: "bull",
            redis: {
                port: 6379,
                host: '127.0.0.1',
                password: '',
    }
        }
    })
})
//Arena is running on port 4567 at host 0.0.0.0