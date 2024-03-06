import express, { Application} from 'express';
import mongoose from 'mongoose';
import user from './routes/user';
import  myEmitter  from './hooks';
const app: Application = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI

app.use(express.json());
app.use("/api", user); 

if(!MONGODB_URI){
    console.log("mongo URI not defined");
    process.exit()
}
mongoose.connect(MONGODB_URI).then(() => {
   
    app.listen(PORT, () => {
        myEmitter.emit("afterStart", PORT)
      });
});

const conn = mongoose.connection

export {conn}




