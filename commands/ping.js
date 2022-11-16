const command = {
    name: 'ping',
    description: 'Ping!',
    execute(interaction, args) {
        interaction.reply("Pong: " + (Date.now() - interaction.createdTimestamp) + "ms");
    }
}

export default command;