import { EmbedBuilder  } from "discord.js";

export const guildMemberRemove = (client, options) => {
    client.on('guildMemberRemove', async member => {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'discord-logs');
        if (!channel) return;

        channel.send({ embeds : [new EmbedBuilder()
            .setTitle(`Member Left`)
            .setDescription(`<@${member.id}> ${member.user.tag}`)
            .setTimestamp()
            .setThumbnail(member.user.avatarURL())
            ]
        });
    });
}

export default guildMemberRemove;