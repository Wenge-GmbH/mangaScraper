import { agenda } from '../agenda';

export default () => {
  agenda.define('test', (job, done) => {
    console.log('start', job.attrs.name);
    console.log(job.attrs.data);
    console.log(job.attrs.priority);

    setTimeout(() => {
      console.log('end', job.attrs.name);
      done();
    }, 15000);
  });

  agenda.on('success:test', async (job) => {
    console.log('removing job "test" after successfull execution');
    try {
      await job.remove();
      console.log('job removed');
    } catch (e) {
      console.log(e);
      console.log('failed to remove job');
    }
  });
};
