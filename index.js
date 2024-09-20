const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });

import { checkWeatherConditions } from 'src/weather.js'
import { DISCORD_TOKEN,USER_ID } from './config.json';

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  message.author.send('Hello! I will send you weather alerts.').catch(console.error);
});

setInterval(() => checkWeatherConditions(client), 60 * 60 * 1000);

client.login(DISCORD_TOKEN);
