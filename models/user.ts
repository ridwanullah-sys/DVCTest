import { Schema, model } from 'mongoose';
import fs from 'fs'
import Joi from 'joi';

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

class Document {
  Model
  constructor(modelName:string) {
    const schema = this.loadSchemaFromJSON(modelName);
    this.Model = model<UserAttributes>(this.prefix(modelName), schema);
  }

  prefix = (name: string): string => {
    if (name.startsWith('\t')) return name;
    return `tab${name}`;
  }
  

  loadSchemaFromJSON(modelName:string) {
    const filePath = `json/${modelName}.json`;
    if (!fs.existsSync(filePath)) {
      throw new Error(`Schema file for ${modelName} not found.`);
    }
    const schemaData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const schema = new Schema<UserAttributes>(schemaData, {timestamps:true});
    return schema;
  }

  validate(data:UserAttributes){
    const val = Joi.object({
      firstName: Joi.string().min(3).max(20).required(),
      lastName: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      age: Joi.number(),
    });
    const { error } = val.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
  }
}

class User extends Document {
  constructor() {
    super('user');
  }
}

export default new User().Model;

