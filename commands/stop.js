import servers from '../configs/servers.json' assert { type: 'json' };
import { getServerState } from '../functions/getServerState.js';
import { changeServerState } from '../functions/changeServerState.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const choices = []

for (let name of Object.keys(servers)) {
    choices.push({
        name: servers[name].map,
        value: name
    })
}

const command = {
    name: 'stop',
    description: 'Stop a server with his name!',
    options: [
        {
            name: 'map',
            description: 'The server map first 3 letters',
            type: 3,
            required: true,
            choices: choices
        }
    ],
    async execute(interaction, args) {
        
        if (await interaction.member.roles.cache.has(process.env.SERVER_ROLE_RESTARTER)) {

        const name = interaction.options.get('map').value;

        const state = await getServerState(name);

        if (state !== "running" && state !== "starting") {
            await interaction.reply(`${servers[name].map} is already stopped!`);
        } else {

            const result = await changeServerState(name, "stop");

            if (result) return interaction.reply(`Successfully stopped ${servers[name].map}!`);    
            else return interaction.reply(`Failed to stop ${servers[name].map}!`);
        }

        } else interaction.reply({ content : 'You don\'t have permission to use this command!', ephemeral: true} )
    }
}

export default command;