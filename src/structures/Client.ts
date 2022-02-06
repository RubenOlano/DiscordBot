import { Client as DiscordClient, ClientOptions } from "discord.js";
import { config } from "dotenv";
config();
const { TOKEN: token } = process.env;

class Client extends DiscordClient {
  public constructor(options: ClientOptions) {
    super(options);
  }

  start() {
    this.login(token);
  }
}

export { Client };
