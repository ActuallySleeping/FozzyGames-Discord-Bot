import { EmbedBuilder } from "discord.js";
import { getServerState } from '../functions/getServerState.js';
import servers from '../configs/servers.json' assert { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

let serversInfo = servers;
let previousInfo = {};

const refreshServers = async () => {
    for (let name of Object.keys(servers)) {
        serversInfo[name]["state"] = await getServerState(name);
    }
};
refreshServers();

export const ready = (client, options) => {

    client.on('ready', async () => {
        console.log(`Logged in as ${client.user.tag}!`);
    
        const channel = client.channels.cache.get(process.env.SERVER_CHANNEL_TEST);
        
        setInterval(async () => {
            previousInfo = JSON.parse(JSON.stringify(serversInfo));
            await refreshServers();
    
            for (let nameID of Object.keys(serversInfo)) {
                const state = serversInfo[nameID]["state"];

                if (previousInfo[nameID]["state"] != state) {
                    fs.appendFileSync(`./logs/${nameID}.log`, `${new Date().toLocaleString()} - ${previousInfo[nameID]["state"]} - ${state}\n`);

                    channel.send({ embeds : [new EmbedBuilder()
                        .setTitle(`Server Status`)
                        .setDescription(`${serversInfo[nameID]["map"]} is now ${state}`)
                        .setColor(
                            state == "running" ? "#007500" :
                            state == "offline" ? "#d6bd00" :
                            state == "starting" ? "#036ffc" :
                            state == "stopping" ? "#036ffc" :
                            "#fc0303"
                        )
                        .setTimestamp()
                        .addFields(
                            { name: 'QuickJoin', value: 'steam://connect/XXX.XXX.XXX.XXX', inline: true },
                        )
                        .setThumbnail(serversInfo[nameID]["image"])
                        .setFooter({ text: 'https://game.fozzy.com/chorks', iconURL: 'https://cdn.survivetheark.com/uploads/monthly_2022_09/1411926892_fozzygameslogo.thumb.png.eba4ad9b43ef7ee7917214cb77201c1a.png' })
    
                        ]});
                }
            }
        }, 1000 * 30 * 1);
    
    });

}

export default ready;