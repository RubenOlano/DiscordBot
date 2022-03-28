import "dotenv/config";

import mongoose from "mongoose";

import { IUser, User } from "../types/user";

const MONGO_URI = process.env.MONGO_URI as string;

export const connect = async (): Promise<void> => {
    await mongoose.connect(MONGO_URI);

    const database = mongoose.connection;

    database.on("error", console.error.bind(console, "connection error:"));
    database.once("open", () => {
        console.log("Connected to database");
    });
};

export const checkUser = async (userId: string): Promise<IUser> => {
    let user = await User.findOne({ discordId: userId });

    if (!user) {
        user = await User.create({ discordId: userId });
    }

    return user;
};
