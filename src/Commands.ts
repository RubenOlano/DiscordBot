import { Command } from "./Command";
import { Hello } from "./Commands/Hello";
import { Play } from "./Commands/Play";
import { Skip } from "./Commands/Skip";

export const Commands: Command[] = [Hello, Play, Skip];
