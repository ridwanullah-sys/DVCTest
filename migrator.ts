import fs from 'fs';
import path from 'path'
import mongoose from 'mongoose';
import  myEmitter  from './hooks';
require("dotenv").config();

const migrate = async () => {
const MONGODB_URI = process.env.MONGO_URI

if(!MONGODB_URI){
    console.log("mongo URI not defined");
    process.exit()
}
    await mongoose.connect(MONGODB_URI)
    const conn = mongoose.connection;
    
    const modelsFolderPath = path.join(__dirname, 'models');
    const folder = fs.readdirSync(modelsFolderPath)
    
    const myPromise = new Promise<void>((resolve, reject) => {
      
      folder.forEach(async (file, index) => {
     
      if (file.endsWith('.ts')) {
        
        const model = require(path.join(modelsFolderPath, file)).default
        myEmitter.emit("beforeMigration", model.modelName);

        if (typeof model.createCollection === 'function') {
          const collections = await conn.db.listCollections().toArray();
          let exist;
         
          const checkIfExist = new Promise<void>((res, rej) => {
            if(collections.length < 1)res()
           collections.forEach((collection, index) => {
            if(collection.name == `${model.modelName}s`){
              exist = true
            } 
            if(index == collections.length - 1)res()

          })
          })

          await checkIfExist

          if(!exist){
            await conn.db.createCollection(`${model.modelName}s`)
            console.log(`${model.modelName} collection created successfully`);
          }
          myEmitter.emit("afterMigration", model.modelName);

          if(index == folder.length - 1){
            resolve()}
        } else {
          console.log(`${model.modelName} does not have a createCollection method`);
          if(index == folder.length - 1){
            resolve()}
        }
        
      }
       
    });
  })
  await myPromise
  
  }
 
  migrate().then(() => {
    process.exit()
  })