import { Command } from "./Command";
import { Hello } from "./Commands/Hello";
import { Play } from "./Commands/Play";
import { Queue } from "./Commands/Queue";
import { Skip } from "./Commands/Skip";
import { Stop } from "./Commands/Stop";
import { Time } from "./Commands/Time";

export const Commands: Command[] = [Hello, Play, Skip, Stop, Queue, Time];
