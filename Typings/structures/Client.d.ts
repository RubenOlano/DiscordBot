import { Client as DiscordClient, ClientOptions } from "discord.js";
declare class Client extends DiscordClient {
    constructor(options: ClientOptions, token: string);
    start(): void;
    fetchData(): Promise<any>;
}
export { Client };
//# sourceMappingURL=Client.d.ts.map