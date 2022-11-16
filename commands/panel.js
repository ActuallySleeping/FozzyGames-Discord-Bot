import { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const send = (interaction, title, description, ...components) => interaction.channel.send({ embeds : [new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor('#fc4e03')
    .setTimestamp()
    .setFooter({ text: 'https://game.fozzy.com/chorks', iconURL: 'https://cdn.survivetheark.com/uploads/monthly_2022_09/1411926892_fozzygameslogo.thumb.png.eba4ad9b43ef7ee7917214cb77201c1a.png' })
    ], components : components });

const command = {
    name: 'panel',
    description: 'Send a panel!',
    options: [
        {
            name: 'id',
            description: 'The name of the panel',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'Rates',
                    value: 'rates'
                },
                {
                    name: 'Rules',
                    value: 'rules'
                },
                {
                    name: 'Verify',
                    value: 'verify'
                }
            ]
        }
    ],
    async execute(interaction, args) {
        if (await interaction.member.roles.cache.has(process.env.SERVER_ROLE_STAFF)) {

        interaction.reply({ content: "Sending panel...", ephemeral: true });

        const panel = interaction.options.get('id').value

        if (panel === 'rates') {
        }
        else if (panel === 'rules') {
            send(interaction, 'Discord Rules', `All the cluster is sponsorised by games fozzy.\n\n- No racism,\n- No hates,\n- No porn/sexual/Gore pictures/gif/video\n- No politics,\n- No discord links,\n- No adds for other servers, \n\nDo not insults people, staff or any other people for any reason. \n\nDoing ads for other servers/communities is not allowed in discord also in private message.\n\nSharing cheat or any dupe methode is not allowed also in private message it will be instant ban. \n\nSharing porn/sexual or gore video/gif/pictures is not tolerate.`)
                .then(() => send(interaction, `Cluster Rules`, `Most of the rules will be the same as the Code of Conduct of SurviveTheARK:\nhttps://support.survivetheark.com/hc/en-us/articles/220278968-Code-of-Conduct\n\n- No ally:\nThere is a limited amount of people in tribe. That mean no ally for defend or attack.\nYou can't fob with another tribe to try to raid a base/fob. \nYou also can't defend a base that are getting attacked except if you want to raid them after. \n\n- No cheats/exploits:\nJust to be sure, cheat/exploits (also mods exploits) will not be tolerate. \n\n- No insults/hates/racism:\nInsulting people for free or saying racism stuff ingame will not be tolerate. \n\nBuild spot:\nMaybe all caves will be buildable. We still discuss about that.`)
                )
        } 
        else if (panel === 'verify'){

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('verify')
                        .setLabel('Verify')
                        .setStyle(ButtonStyle.Primary)
                )
            
            send(interaction, 'Verify', 'Click on the button to verify yourself.', row)

        }

        } else interaction.reply({ content : 'You don\'t have permission to use this command!', ephemeral: true} )
    }
}

export default command;