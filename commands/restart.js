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
    name: 'restart',
    description: 'Restart a server with his name!',
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

        if (state === "starting" ) {
            await interaction.reply(`${servers[name].map} is already starting!`);

            return;

        } else {

            let result = 0;
            if (state === 'stopped' ) result = await changeServerState(name, "start");
            else result = await changeServerState(name, "restart");
    
            if (result) return interaction.reply(`Successfully restarted ${servers[name].map}!`);
            else return interaction.reply(`Failed to restart ${servers[name].map}!`);
        }

        } else interaction.reply({ content : 'You don\'t have permission to use this command!', ephemeral: true} )
    }
}

export default command;