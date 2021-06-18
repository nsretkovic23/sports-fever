import mongoose from 'mongoose';
import Report from '../models/reports.model.js';
import router from '../routes/reports.js';

export const getAllReports = async (req, res) =>{
    try {
        const allReports = await Report.find();
        
        res.status(200).json(allReports);
    } catch (error) {
        res.status(404).json({message:"Error fetching reports"})
    }
}

export const newReport= async (req, res) =>{
    const newReport= new Report(req.body);

    try {
        await newReport.save();

        res.status(201).json(newReport)
    } catch (error) {
        res.status(409).json({message:"Error making new report"})
    }
}

export const deleteReport = async (req, res) =>{
    const {id} = req.params;

    try {
        await Report.findByIdAndDelete(id);

        res.status(200).json({message:"deleted successfully"});
    } catch (error) {
        res.status(404).json({message:"error event not found, deletion unsuccessful"});
    }
}
