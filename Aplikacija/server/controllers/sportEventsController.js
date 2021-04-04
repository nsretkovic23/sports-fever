import mongoose from 'mongoose';
import express from 'express';

import SportEvent from '../models/sportEvent.model.js';

const router = express.Router();

export const getSportEvents = async (req, res) => {
    try{
        const allSportEvents = await SportEvent.find();

        res.status(200).json(allSportEvents);
    }
    catch(err){
         res.status(404).json({message:err.message});
    }
}

export const createSportEvent = async (req, res) => {

    const {title, description, date, free_spots, sport, lat, lng} = req.body;
    const newSportEvent=new SportEvent({title, description, date, free_spots, sport, lat, lng});

    try{
        await newSportEvent.save();

        res.status(201).json(newSportEvent); //201 uspesno kreiranje
    }
    catch(err){
        res.status(409).json({message:err.message}); //conflict
    }


}

export default router;