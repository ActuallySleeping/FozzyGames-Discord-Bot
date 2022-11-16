import { uploadFiles } from '../functions/uploadFiles.js'
import servers from '../configs/servers.json' assert { type: 'json' };
import * as fs from 'fs';

const choices = [{
    name: 'All Servers',
    value: 'all'
}]

for (let name of Object.keys(servers)) {
    choices.push({
        name: servers[name].map,
        value: name
    })
}

const uploadToServer = async (interaction, serverName) => {
    let opts = { game : "", gameUserSettings : "" }
    if( fs.existsSync(`../configs/${serverName}/`) ){

        if( fs.existsSync(`../configs/${serverName}/Game.ini`) ) opts.game = "\n" + fs.readFileSync(`../configs/${serverName}/Game.ini`, 'utf8');
        if( fs.existsSync(`../configs/${serverName}/GameUserSettings.ini`) ) opts.gameUserSettings = "\n" + fs.readFileSync(`../configs/${serverName}/GameUserSettings.ini`, 'utf8');

    }

    const res = await uploadFiles(serverName, [{
        name: 'Game.ini',
        content: fs.readFileSync(`./configs/Game.ini`, 'utf8') + opts.game,
        path: `/ShooterGame/Saved/Config/LinuxServer`

    }, {
        name: 'GameUserSettings.ini',
        content: fs.readFileSync(`./configs/GameUserSettings.ini`, 'utf8') + `ChorksCluster - ${serverName.charAt(0).toUpperCase() + serverName.slice(1)} - powered by games.fozzy.com\n` + opts.gameUserSettings,
        path: `/ShooterGame/Saved/Config/LinuxServer`
    }])

    return res
}

const command = {
    name: 'uploadconfigs',
    description: 'Upload the configs to every server!',
    options: [
        {
            name: 'map',
            description: 'The server map',
            type: 3,
            required: true,
            choices: choices
        }
    ],
    async execute(interaction, args) {
        interaction.deferReply();

        const name = interaction.options.get('map').value;

        if( name === 'all' ){

            let i = 0, sum = 0;
            for await (const serverName of Object.keys(servers)) {
                i += 1;
                sum += await uploadToServer(interaction, serverName);
            }

            if (sum === i) interaction.editReply(`Successfully uploaded configs to all servers!`);
            else interaction.editReply(`Failed to upload configs to some servers!`);

        }

        if( Object.keys(servers).includes(name) ){

            const sum = await uploadToServer(interaction, name);
            
            if (sum) interaction.editReply(`Successfully uploaded configs to ${servers[name].map}!`);
            else interaction.editReply(`Failed to upload configs to ${servers[name].map}!`);
        }

    }
}

export default command;