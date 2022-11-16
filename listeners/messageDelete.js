import { EmbedBuilder  } from "discord.js";

export const messageDelete = (client, options) => {
    client.on('messageDelete', async message => {
        const channel = message.guild.channels.cache.find(ch => ch.name === 'discord-logs');
        if (!channel) return;

        channel.send({ embeds : [new EmbedBuilder()
            .setTitle(`Message Deleted`)
            .setDescription(`<@${message.author.id}> ${message.author.tag}`)
            .addFields(
                { name: 'Message', value: message.content, inline: true },
            )
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            ]
        });
    });
}

export default messageDelete;