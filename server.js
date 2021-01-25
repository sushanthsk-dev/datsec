const dotenv = require('dotenv');
const mongoose = require('mongoose');
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN');
  console.log(err, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected successfully');
  });
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLEDREJECTION! SHUTTING DOWN GRACEFULLY');
  console.log(err, err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM')
