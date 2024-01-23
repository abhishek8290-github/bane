const app = require('./app');


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });


const exitHandler = () => {
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
const unexpectedErrorHandler = (error) => {
    // logger.error(error);
    exitHandler();
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  
  process.on('SIGTERM', () => {
    // logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
  



