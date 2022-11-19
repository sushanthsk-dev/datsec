const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cluster = require('cluster');
const os = require('os');

const totalCPU = os.cpus().length;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN');
  console.log(err, err.message);
  process.exit(1);
});
dotenv.config({ path: '.env' });
const app = require('./app');
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

// mongoose
//   .connect(DB, {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected successfully');
//   });
const port = process.env.PORT || 3000;
// if (cluster.isMaster) {
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < 4; i++) {
//       cluster.fork();
//   } 
// } else {
app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});
// }
console.log(`${process.pid}`);


process.on('unhandledRejection', (err) => {
  console.log('UNHANDLEDREJECTION! SHUTTING DOWN GRACEFULLY');
  console.log(err, err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED, Shutting down gracefully');
  server.close(() => {
    console.log('Proces terminated!');
  });
});
