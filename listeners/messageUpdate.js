import { EmbedBuilder  } from "discord.js";

export const MessageUpdate = (client, options) => {
    client.on('messageUpdate', async (oldMessage, newMessage) => {

        if (oldMessage.author.bot) return;

        const channel = oldMessage.guild.channels.cache.find(ch => ch.name === 'discord-logs');
        if (!channel) return;

        if (oldMessage.content == newMessage.content) return;

        channel.send({ embeds : [new EmbedBuilder()
            .setTitle(`Message Edited`)
            .setDescription(`<@${oldMessage.author.id}> ${oldMessage.author.tag}`)
            .addFields(
                { name: 'Old Message', value: oldMessage.content, inline: true },
                { name: 'New Message', value: newMessage.content, inline: true },
            )
            .setTimestamp()
            .setThumbnail(oldMessage.author.avatarURL())
            ]
        });
    });
}

export default MessageUpdate;