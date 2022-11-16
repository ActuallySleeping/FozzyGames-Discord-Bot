import { EmbedBuilder  } from "discord.js";

export const guildMemberAdd = (client, options) => {
    client.on('guildMemberAdd', async member => {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'discord-logs');
        if (!channel) return;

        const accountAge = Math.floor((Date.now() - member.user.createdTimestamp) / 1000 / 60 / 60 / 24);

        const years = Math.floor(accountAge / 365);
        const months = Math.floor((accountAge % 365) / 30);
        const days = Math.floor((accountAge % 365) % 30);

        channel.send({ embeds : [new EmbedBuilder()
            .setTitle(`Member Joined`)
            .setDescription(`<@${member.id}> ${member.user.tag}`)
            .addFields(
                { name: 'Account Age', value: `${years} years, ${months} months, ${days} days`, inline: true },
            )
            .setTimestamp()
            .setThumbnail(member.user.avatarURL())
            ]
        });
    });
}

export default guildMemberAdd;