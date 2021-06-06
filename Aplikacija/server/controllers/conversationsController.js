import mongoose from 'mongoose'
import express from 'express'
import Conversation from '../models/conversation.model.js';
import User from '../models/user.model.js'

export const makeNewConversation = async (creatorid, eventid) =>{
    const newConversation = new Conversation({
        members:[creatorid],
        eventId:eventid
    })

    try {
         await newConversation.save();
    } catch (error) {
        throw new Error("Error creating conversation");
    }
}

export const joinConversation = async (userid, eventid) =>{
    const allConversations = await Conversation.find();
    let specificConversation = allConversations.filter((conv) =>
        conv?.eventId === eventid)
    
    console.log(specificConversation);
    
    specificConversation[0].members.push(userid);

    try{
        await Conversation.findByIdAndUpdate(specificConversation[0].id, specificConversation[0], { new: true });
    }catch(error){
        throw new Error("error adding user into the conversation");
    }

}

export const getConversation = async (eventId_param) => {
    try {
        const specificConversation = await Conversation.findOne({eventId : eventId_param})
        //console.log(specificConversation);
        return specificConversation;
    } catch (error) {
        console.log("greska getconvo");
    }
}
