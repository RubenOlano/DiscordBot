import "dotenv/config";

import { connect } from "./lib/database";
import { createInteraction } from "./listeners/interactionCreate";
import { onMessage } from "./listeners/onMessage";
import { ready } from "./listeners/ready";
import { voiceChange } from "./listeners/updateVoice";
import { client } from "./Structs/client";

ready(client);
createInteraction(client);
onMessage(client);
voiceChange(client);

const main = async () => {
    await connect();
    await client.login(process.env.TOKEN);
};

main();
