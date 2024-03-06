import User from '../models/user';
import Joi  from "joi";
import express from 'express';
const router = express.Router();

router.post("/", async (req, res ) => {
  User.validate(req.body)
  const { firstName, lastName, email, age } = req.body;

  const exists = await User.findOne({  email } );;

    if (exists) {
    return res.status(400).json({error : "User already exists..."})   
  };
   
    try {
        const result = await User.create({ firstName, lastName, email, age });
        return res.status(200).json(result)
    } catch(e:any){
        return res.status(400).json({error: e.message});
    }
});

router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    return res.status(200).json(result)
} catch(e:any){
    return res.status(400).json({error: e.message});
} 
})

router.get("/getById/:id", async (req, res) => {
  const {id} = req.params
  try {
    const result = await User.findById(id);;
    return res.status(200).json(result)
} catch(e:any){
    return res.status(400).json({error: e.message});
} 
})

router.get("/getByAge/:age", async (req, res) => {
  const {age} = req.params
  try {
    const result = await User.find({ age } );;
    return res.status(200).json(result)
} catch(e:any){
    return res.status(400).json({error: e.message});
} 
})

export default router
