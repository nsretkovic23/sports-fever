import CreditRequest from "../models/creditRequest.model.js";

export const getCreditRequests = async (req, res) => {
    try {
        const allCreditRequests = await CreditRequest.find();

        res.status(200).json(allCreditRequests)
    } catch (error) {
        res.status(404).json({message:"error fetching credit requests"})
    }
}

export const newCreditRequest = async(req, res) => {
    const newRequest = new CreditRequest(req.body);

    try {
        await newRequest.save();

        res.status(201).json(newRequest);
    } catch (error) {
        res.status(409).json({message:"error making new credit request"})
    }
}

export const deleteRequest = async(req, res) => {
    const {id} = req.params;

    try {
        await CreditRequest.findByIdAndDelete(id);

        res.status(200).json({message:"deleted successfully"});
    } catch (error) {
        res.status(404).json({message:"request not found, deletion unsuccessful"})
    }
}