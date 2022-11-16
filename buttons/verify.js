const command = {
    name: 'verify',
    description: 'Verify the user by letting him click on a button!',
    async execute(interaction, args) {

        const user = interaction.member;

        if (interaction.user.bot) {
            interaction.reply({ content : "Sorry you are a bot!", ephemeral: true});
            return;
        }

        if ( user.roles.cache.some(role => role.id === '1036619451723956224') ) {
            interaction.reply({ content : "You already have the role!", ephemeral: true});
            return;
        }

        await user.roles.add('1036619451723956224');

        interaction.reply({ content : 'You are successfully verified!', ephemeral: true});
    }
}

export default command;