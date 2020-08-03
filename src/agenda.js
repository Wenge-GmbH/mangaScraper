import Agenda from 'agenda';

// const connectionOpts = {
//   db: { address: process.env.DB_URL },
//   collection: 'agendaJobs',
// };

export const agenda = new Agenda({ maxConcurrency: 5 });
export const initAgenda = async ({ app }) => {
  agenda.mongo(app.context.db.db, 'agendaJobs');

  agenda.on('ready', (e) => {
    console.log('agenda ready');
  });

  await agenda.start();
  app.context.agenda = agenda;
};
