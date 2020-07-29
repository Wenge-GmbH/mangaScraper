import Agenda from 'agenda';

// const connectionOpts = {
//   db: { address: process.env.DB_URL },
//   collection: 'agendaJobs',
// };

const initAgenda = async ({ app }) => {
  const agenda = new Agenda();
  agenda.mongo(app.context.db.db, 'agendaJobs');

  agenda.on('ready', (e) => {
    console.log('agenda ready');
  });
  await agenda.start();
  app.context.agenda = agenda;
};

export default initAgenda;
