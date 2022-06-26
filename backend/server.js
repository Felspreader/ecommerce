const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling uncaught Exception

process.on("uncaughtException",(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled  uncaught Exception`);
  process.exit(1);

})



// config
dotenv.config({path:"backend/config/config.env"});

// connecting to database
connectDatabase()

const server =  app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
// console.log(youtube)
// unhandled Promise Rejection 

process.on("unhandledRejection", (err)=>{
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(()=>{
    process.exit(1);
  });
});