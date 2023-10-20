const { REST } = require("discord.js");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray } = client;

    const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../../commands/${file}`);
      commands.set(command.data.name, command);
      commandArray.push(command.data); 
      console.log(`Command ${command.data.name} has passed through the handler`);
    }

    const clientId = "1158781574322598078";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
