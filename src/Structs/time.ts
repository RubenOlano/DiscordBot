interface TimeInChannel {
    timeJoined?: Date;
    timeLeft?: Date;
}

export const time = new Map<string, TimeInChannel>();
