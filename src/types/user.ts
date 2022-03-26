import { Snowflake } from "discord.js";
import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    discordId: Snowflake;
    timeJoined: Date | undefined;
    timeLeft: Date | undefined;
}

const UserSchema = new mongoose.Schema<IUser>({
    discordId: {
        type: String,
        required: true,
    },
    timeJoined: {
        type: Date,
        required: false,
    },
    timeLeft: {
        type: Date,
        required: false,
    },
});

export const User = mongoose.model<IUser>("User", UserSchema);
