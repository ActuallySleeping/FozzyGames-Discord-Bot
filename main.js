import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config({ path: `./.env` });
import { REST, Routes, Client, IntentsBitField } from 'discord.js';

let commands = []
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const client = new Client({ intents: [new IntentsBitField(4194303)] });

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for await (const file of commandFiles) {

    const command = await import(`./commands/${file}`);
    commands.push(command.default);
}

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });
    
        console.log('Successfully reloaded application (/) commands.');

    } catch (error) {console.error(error);}
})();

const LISTENERS = fs.readdirSync('./listeners').filter(file => file.endsWith('.js'));

for await (const file of LISTENERS) {

    const listener = await import(`./listeners/${file}`);
    listener.default(client, { commands : commands });
}

client.login(process.env.DISCORD_TOKEN);