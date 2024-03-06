import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the Model name: ', (modelname) => {
  const fileContent = generateModelFileContent(modelname);
  const jsonContent = generateJsonFile(modelname)

  if (!fs.existsSync("models")) {
    fs.mkdirSync("models");
  }

  if (!fs.existsSync("json")) {
    fs.mkdirSync("json");
  }
  
  fs.writeFileSync(`models/${modelname}.ts`, fileContent);
  fs.writeFileSync(`json/${modelname}.json`, jsonContent);

  console.log(`Model has been generated successfully.`);
  rl.close();
});

function capitalizeFirstLetter(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

function generateJsonFile(modelname:string){
  return `{
    "firstName": { "type": "String", "required": true, "minlength": 3, "maxlength": 20 },
    "lastName": { "type": "String", "required": true, "minlength": 3, "maxlength": 20 },
    "email": { "type": "String", "required": true, "unique": true },
    "age": { "type": "Number" }
}`
}

function generateModelFileContent(modelname:string) {
  return `
  import { Schema, model } from 'mongoose';
  import fs from 'fs'
  import Joi from 'joi';
  
  interface ${capitalizeFirstLetter(modelname)}Attributes {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
  }
  
  class Document {
    Model
    constructor(modelName:string) {
      const schema = this.loadSchemaFromJSON(modelName);
      this.Model = model<${capitalizeFirstLetter(modelname)}Attributes>(this.prefix(modelName), schema);
    }
  
    prefix = (name: string): string => {
      if (name.startsWith('\\t')) return name;
      return \`tab\${name}\`;
    }
    
  
    loadSchemaFromJSON(modelName:string) {
      const filePath = \`json/\${modelName}.json\`;
      if (!fs.existsSync(filePath)) {
        throw new Error(\`Schema file for \${modelName} not found.\`);
      }
      const schemaData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const schema = new Schema<${capitalizeFirstLetter(modelname)}Attributes>(schemaData, {timestamps:true});
      return schema;
    }
  
    validate(data:${capitalizeFirstLetter(modelname)}Attributes){
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
  
  class ${capitalizeFirstLetter(modelname)} extends Document {
    constructor() {
      super('${modelname}');
    }
  }
  
  export default new ${capitalizeFirstLetter(modelname)}().Model;
  `;
}
