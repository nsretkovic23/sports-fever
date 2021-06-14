import mongoose from 'mongoose'
import express from 'express'
import Message from '../models/message.model.js';

export const getMessages = async (convoId) => {
    const allMsgsFromConversation = Message.find({conversationId:convoId});

    return allMsgsFromConversation;
} 

export const newMessage = async (req, res) => {
    const newMsg = new Message(req.body);

    try {
        await newMsg.save()

        res.status(201).json(newMsg)
    } catch (error) {
        res.status(409).json({message:"Error sending message"})
    }
}

export const deleteMessage = async (msgid) => {
    await Message.findByIdAndDelete(msgid);
}