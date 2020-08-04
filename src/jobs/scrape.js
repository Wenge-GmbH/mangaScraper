import { agenda } from '../agenda';
// import scrape from '../scrape';

export default () => {
  agenda.define('scrape novel', async (job) => {
    // find novel by id
    console.log('start', job.attrs.name);

    setTimeout(() => {
      console.log('end', job.attrs.name);
      done();
    }, 15000);
  });

  // mby lets see
  // agenda.define('scrape new  novel', async (job) => {

  // })

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
