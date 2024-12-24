/* 
export interface logEntityOptions {
    level: LogSeverityLevel,
    message: string,
    origin: string,
    createdAt?: Date
}
 */


import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    origin: {
        type: String
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export const logModel = mongoose.model('Log', logSchema)