import mongoose from "../db";

export default mongoose.model(
    "TPSEntry",
    new mongoose.Schema({
        metadata: {
            required: false,
            type: mongoose.Schema.Types.Mixed
        },
        abilities: {
            required: false,
            type: mongoose.Schema.Types.Mixed
        },
        counters: {
            required: false,
            type: mongoose.Schema.Types.Mixed
        },
        data: {
            required: false,
            type: mongoose.Schema.Types.Mixed
        },
        ratings: {
            required: false,
            type: mongoose.Schema.Types.Mixed
        },
        timers: {
            required: false,
            type: mongoose.Schema.Types.Mixed
        },
        serverTimestamp: Number,
        hash: String,
        privacy: {
            required: false,
            type: mongoose.Schema.Types.Mixed
        }
    })
);
