import * as fs from 'fs';

const BUTTONS = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));

export const interactionCreate = (client, options = {}) => {
    if( ! options["commands"] ) throw new Error("You must provide a commands array."); 

    client.on('interactionCreate', async interaction => {
        if (interaction.isButton()){
    
            if (BUTTONS.includes(`${interaction.customId}.js`)) {
                const button = await import(`../buttons/${interaction.customId}.js`);
                button.default.execute(interaction);
            }
        }
    
        if (interaction.isChatInputCommand()){

            const commands = options["commands"];
    
            const [commandName, ...args] = interaction.commandName.split(' ');
            const command = commands.find(cmd => cmd.name === commandName);
            
            if (command) command.execute(interaction, args);
        }
    
    });
}

export default interactionCreate;